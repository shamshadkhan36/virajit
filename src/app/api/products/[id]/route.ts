import { NextRequest, NextResponse } from "next/server";
import { getProductStockStatus } from "@/lib/stock-engine";
import { FORMATTED_PRODUCTS } from "@/lib/catalogue-data";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken") || undefined;
    
    let product: any = null;
    try {
      product = await getProductStockStatus(params.id, sessionToken);
    } catch (e) {
      console.warn("Stock status lookup warning:", e);
    }

    if (!product) {
      // Fallback to in-memory catalogue
      const found = FORMATTED_PRODUCTS.find(
        (p) => p.id === params.id || p.slug === params.id
      );
      if (found) {
        return NextResponse.json({ success: true, product: found });
      }
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    const fallback = FORMATTED_PRODUCTS.find(
      (p) => p.id === params.id || p.slug === params.id
    );
    if (fallback) {
      return NextResponse.json({ success: true, product: fallback });
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
