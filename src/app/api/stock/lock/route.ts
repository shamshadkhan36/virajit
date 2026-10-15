import { NextRequest, NextResponse } from "next/server";
import { lockProductStock } from "@/lib/stock-engine";

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

    const ip = req.headers.get("x-forwarded-for") || req.ip || undefined;
    const result = await lockProductStock(productId, sessionToken, ip);

    return NextResponse.json({
      success: true,
      lock: result.lock,
      message: result.message,
      secondsRemaining: result.secondsRemaining,
    });
  } catch (error: any) {
    console.error("Lock error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unable to reserve this item at the moment.",
      },
      { status: 400 }
    );
  }
}
