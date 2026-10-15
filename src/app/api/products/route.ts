import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { expireStaleLocks } from "@/lib/stock-engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken") || undefined;
    const brand = searchParams.get("brand");
    const grade = searchParams.get("grade");
    const search = searchParams.get("search");

    await expireStaleLocks();

    const where: any = {};
    if (brand && brand !== "All") {
      where.brand = { equals: brand };
    }
    if (grade && grade !== "All") {
      where.conditionGrade = { contains: grade };
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { processor: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        locks: {
          where: {
            status: "ACTIVE",
            lockedUntil: { gt: new Date() },
          },
        },
      },
    });

    const enriched = products.map((p) => {
      const activeLocks = p.locks || [];
      const myLock = sessionToken
        ? activeLocks.find((l) => l.sessionToken === sessionToken)
        : null;
      const activeLocksCount = activeLocks.length;
      const availableStock = Math.max(0, p.stock - activeLocksCount);

      let lockSecondsRemaining = 0;
      if (myLock) {
        const diff = new Date(myLock.lockedUntil).getTime() - Date.now();
        lockSecondsRemaining = Math.max(0, Math.floor(diff / 1000));
      }

      return {
        ...p,
        availableStock,
        activeLocksCount,
        isLockedByMe: !!myLock,
        myLockId: myLock?.id || null,
        lockExpiresAt: myLock?.lockedUntil?.toISOString() || null,
        lockSecondsRemaining,
      };
    });

    return NextResponse.json({ success: true, products: enriched });
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
