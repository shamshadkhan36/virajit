import { NextRequest, NextResponse } from "next/server";
import { getProductStockStatus } from "@/lib/stock-engine";
import { FORMATTED_PRODUCTS } from "@/lib/catalogue-data";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionToken = searchParams.get("sessionToken") || undefined;
    
    let product: any = null;
    try {
      product = await withTimeout(getProductStockStatus(params.id, sessionToken), 2000);
    } catch (e) {
      console.warn("Stock status lookup timed out or failed:", e);
    }

    if (!product) {
      // Fallback to in-memory catalogue
      const found = FORMATTED_PRODUCTS.find(
        (p) =>
          p.id === params.id ||
          p.slug === params.id ||
          p.id === `prod-${params.id}` ||
          p.slug.includes(params.id) ||
          params.id.includes(p.id.replace("prod-", ""))
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
      (p) =>
        p.id === params.id ||
        p.slug === params.id ||
        p.id === `prod-${params.id}` ||
        p.slug.includes(params.id) ||
        params.id.includes(p.id.replace("prod-", ""))
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
