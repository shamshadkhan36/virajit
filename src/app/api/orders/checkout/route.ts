import { NextRequest, NextResponse } from "next/server";
import { finalizeCheckout } from "@/lib/stock-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    } = body;

    if (
      !productId ||
      !sessionToken ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide all required shipping and contact details.",
        },
        { status: 400 }
      );
    }

    const result = await finalizeCheckout({
      productId,
      sessionToken,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city: city || "Metropolis",
      postalCode: postalCode || "00000",
      paymentMethod: paymentMethod || "Credit Card / Cash on Delivery",
    });

    return NextResponse.json({
      success: true,
      order: result.order,
      message: "Order placed successfully! 1 unit deducted from inventory.",
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process checkout.",
      },
      { status: 400 }
    );
  }
}
