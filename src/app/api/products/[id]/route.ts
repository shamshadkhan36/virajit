import { NextRequest, NextResponse } from "next/server";
import { getProductStockStatus } from "@/lib/stock-engine";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken") || undefined;
    const product = await getProductStockStatus(params.id, sessionToken);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
