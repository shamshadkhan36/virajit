import { NextRequest, NextResponse } from "next/server";
import { releaseProductStockLock } from "@/lib/stock-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, sessionToken } = body;

    if (!productId || !sessionToken) {
      return NextResponse.json(
        { success: false, error: "Missing productId or sessionToken." },
        { status: 400 }
      );
    }

    await releaseProductStockLock(productId, sessionToken);

    return NextResponse.json({
      success: true,
      message: "Stock lock released successfully.",
    });
  } catch (error: any) {
    console.error("Release lock error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to release lock" },
      { status: 500 }
    );
  }
}
