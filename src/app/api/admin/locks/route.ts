import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { expireStaleLocks } from "@/lib/stock-engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await expireStaleLocks();

    const [allLocks, totalActiveCount, totalPurchasedCount, totalExpiredCount] =
      await Promise.all([
        prisma.stockLock.findMany({
          orderBy: { createdAt: "desc" },
          take: 100,
          include: {
            product: true,
          },
        }),
        prisma.stockLock.count({
          where: {
            status: "ACTIVE",
            lockedUntil: { gt: new Date() },
          },
        }),
        prisma.stockLock.count({
          where: { status: "PURCHASED" },
        }),
        prisma.stockLock.count({
          where: { status: "EXPIRED" },
        }),
      ]);

    const enrichedLocks = allLocks.map((lock) => {
      const isStillActive =
        lock.status === "ACTIVE" && new Date(lock.lockedUntil) > new Date();
      let lockSecondsRemaining = 0;
      if (isStillActive) {
        const diff = new Date(lock.lockedUntil).getTime() - Date.now();
        lockSecondsRemaining = Math.max(0, Math.floor(diff / 1000));
      }

      return {
        ...lock,
        isStillActive,
        lockSecondsRemaining,
      };
    });

    return NextResponse.json({
      success: true,
      stats: {
        activeLocks: totalActiveCount,
        purchasedLocks: totalPurchasedCount,
        expiredLocks: totalExpiredCount,
      },
      locks: enrichedLocks,
    });
  } catch (error: any) {
    console.error("Admin locks fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
