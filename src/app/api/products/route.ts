import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { expireStaleLocks } from "@/lib/stock-engine";
import { FORMATTED_PRODUCTS, ensureProductsSeeded } from "@/lib/catalogue-data";

export const dynamic = "force-dynamic";

let hasAttemptedSeed = false;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken") || undefined;
    const brand = searchParams.get("brand");
    const grade = searchParams.get("grade");
    const search = searchParams.get("search");

    // Only attempt seed once per server process, non-blocking
    if (!hasAttemptedSeed) {
      hasAttemptedSeed = true;
      withTimeout(ensureProductsSeeded(), 1500).catch(() => {});
    }

    // Attempt to expire stale locks with short timeout
    try {
      await withTimeout(expireStaleLocks(), 1000);
    } catch (e) {
      // Ignored if DB table not yet created or busy
    }

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

    let products: any[] = [];
    try {
      products = await withTimeout(
        prisma.product.findMany({
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
        }),
        2000
      );
    } catch (dbErr) {
      console.warn("Prisma query timed out or failed, falling back to static catalogue");
    }

    // If database returned no products or timed out, use built-in catalogue data
    if (!products || products.length === 0) {
      let filtered = [...FORMATTED_PRODUCTS];
      if (brand && brand !== "All") {
        filtered = filtered.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
      }
      if (grade && grade !== "All") {
        filtered = filtered.filter((p) => p.conditionGrade.toLowerCase().includes(grade.toLowerCase()));
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.processor.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.model.toLowerCase().includes(q)
        );
      }
      return NextResponse.json({ success: true, products: filtered });
    }

    const enriched = products.map((p) => {
      const activeLocks = p.locks || [];
      const myLock = sessionToken
        ? activeLocks.find((l: any) => l.sessionToken === sessionToken)
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
    console.error("Products fallback triggered due to error:", error);
    return NextResponse.json({ success: true, products: FORMATTED_PRODUCTS });
  }
}
