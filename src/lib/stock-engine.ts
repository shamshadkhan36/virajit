import { prisma } from "@/lib/prisma";

export const LOCK_DURATION_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Sweeps the database to mark expired locks as EXPIRED
 */
export async function expireStaleLocks() {
  const now = new Date();
  await prisma.stockLock.updateMany({
    where: {
      status: 'ACTIVE',
      lockedUntil: {
        lt: now,
      },
    },
    data: {
      status: 'EXPIRED',
    },
  });
}

/**
 * Calculates real-time available stock and lock state for a given product and user session
 */
export async function getProductStockStatus(productIdOrSlug: string, sessionToken?: string) {
  await expireStaleLocks();

  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: productIdOrSlug }, { slug: productIdOrSlug }],
    },
    include: {
      locks: {
        where: {
          status: 'ACTIVE',
          lockedUntil: {
            gt: new Date(),
          },
        },
      },
    },
  });

  if (!product) return null;

  const activeLocks = product.locks || [];
  const myLock = sessionToken
    ? activeLocks.find((l) => l.sessionToken === sessionToken)
    : null;

  // Total active locks by anyone
  const activeLocksCount = activeLocks.length;

  // Available stock is total physical stock minus non-expired active locks
  // If the current user has a lock, that 1 unit is locked FOR THEM
  const availableStock = Math.max(0, product.stock - activeLocksCount);

  let lockSecondsRemaining = 0;
  if (myLock) {
    const diff = new Date(myLock.lockedUntil).getTime() - Date.now();
    lockSecondsRemaining = Math.max(0, Math.floor(diff / 1000));
  }

  return {
    ...product,
    availableStock,
    activeLocksCount,
    isLockedByMe: !!myLock,
    myLockId: myLock?.id || null,
    lockExpiresAt: myLock?.lockedUntil?.toISOString() || null,
    lockSecondsRemaining,
  };
}

/**
 * Locks 1 unit of stock for a customer session for 10 minutes
 */
export async function lockProductStock(productId: string, sessionToken: string, ip?: string) {
  if (!productId || !sessionToken) {
    throw new Error('Product ID and Session Token are required.');
  }

  await expireStaleLocks();

  // Run in interactive transaction to guarantee zero race conditions
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
      include: {
        locks: {
          where: {
            status: 'ACTIVE',
            lockedUntil: { gt: new Date() },
          },
        },
      },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    // Check if current session already has an active lock
    const existingUserLock = product.locks.find((l) => l.sessionToken === sessionToken);
    if (existingUserLock) {
      // Refresh lock duration
      const newLockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
      const updated = await tx.stockLock.update({
        where: { id: existingUserLock.id },
        data: { lockedUntil: newLockedUntil },
      });
      return {
        lock: updated,
        message: 'Existing reservation renewed for 10 minutes.',
        secondsRemaining: Math.floor(LOCK_DURATION_MS / 1000),
      };
    }

    // Check physical inventory vs active locks
    const activeLocksCount = product.locks.length;
    const available = product.stock - activeLocksCount;

    if (available <= 0) {
      if (product.stock > 0) {
        throw new Error('All available units are currently reserved in other shoppers\' carts. Please check back in a few minutes!');
      } else {
        throw new Error('This item is completely out of stock.');
      }
    }

    const lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
    const newLock = await tx.stockLock.create({
      data: {
        productId,
        sessionToken,
        customerIp: ip || null,
        lockedUntil,
        status: 'ACTIVE',
      },
    });

    return {
      lock: newLock,
      message: '1 Unit successfully reserved for 10 minutes.',
      secondsRemaining: Math.floor(LOCK_DURATION_MS / 1000),
    };
  });
}

/**
 * Customer releases a locked unit
 */
export async function releaseProductStockLock(productId: string, sessionToken: string) {
  if (!productId || !sessionToken) return null;

  return await prisma.stockLock.updateMany({
    where: {
      productId,
      sessionToken,
      status: 'ACTIVE',
    },
    data: {
      status: 'RELEASED',
    },
  });
}

/**
 * Finalizes checkout and converts lock to confirmed purchase
 */
export async function finalizeCheckout(params: {
  productId: string;
  sessionToken: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}) {
  const {
    productId,
    sessionToken,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    city,
    postalCode,
    paymentMethod,
  } = params;

  await expireStaleLocks();

  return await prisma.$transaction(async (tx) => {
    // Check if user has an active lock or if product is available
    const product = await tx.product.findUnique({
      where: { id: productId },
      include: {
        locks: {
          where: {
            status: 'ACTIVE',
            lockedUntil: { gt: new Date() },
          },
        },
      },
    });

    if (!product) throw new Error('Product not found.');

    const userLock = product.locks.find((l) => l.sessionToken === sessionToken);
    const activeLocksCount = product.locks.length;

    // If user doesn't have an active lock, verify if there is free stock
    if (!userLock) {
      const freeStock = product.stock - activeLocksCount;
      if (freeStock <= 0) {
        throw new Error('Your reservation expired and the unit was reserved by another shopper. Please try locking again.');
      }
    }

    if (product.stock <= 0) {
      throw new Error('Product is out of stock.');
    }

    // Decrement physical stock by 1
    const updatedProduct = await tx.product.update({
      where: { id: productId },
      data: {
        stock: { decrement: 1 },
      },
    });

    // Mark lock as PURCHASED if it existed
    if (userLock) {
      await tx.stockLock.update({
        where: { id: userLock.id },
        data: { status: 'PURCHASED' },
      });
    }

    // Generate unique human-readable order number
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `RFB-${randomSuffix}`;

    const order = await tx.order.create({
      data: {
        orderNumber,
        productId,
        quantity: 1,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        postalCode,
        totalAmount: product.price,
        paymentMethod: paymentMethod || 'Cash on Delivery / Card',
        status: 'CONFIRMED',
        sessionToken,
      },
    });

    return {
      order,
      product: updatedProduct,
    };
  });
}
