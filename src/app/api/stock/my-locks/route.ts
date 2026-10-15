import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { expireStaleLocks } from "@/lib/stock-engine";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken");

    if (!sessionToken) {
      return NextResponse.json({ success: true, locks: [] });
    }

    await expireStaleLocks();

    const activeLocks = await prisma.stockLock.findMany({
      where: {
        sessionToken,
        status: "ACTIVE",
        lockedUntil: { gt: new Date() },
      },
      include: {
        product: true,
      },
      orderBy: { lockedUntil: "asc" },
    });

    const enriched = activeLocks.map((lock) => {
      const diff = new Date(lock.lockedUntil).getTime() - Date.now();
      const secondsRemaining = Math.max(0, Math.floor(diff / 1000));
      return {
        ...lock,
        secondsRemaining,
      };
    });

    return NextResponse.json({ success: true, locks: enriched });
  } catch (error: any) {
    console.error("My locks error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
