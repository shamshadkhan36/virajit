import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const {
      name,
      brand,
      model,
      processor,
      ram,
      storage,
      screen,
      gpu,
      batteryHealth,
      conditionGrade,
      price,
      originalPrice,
      stock,
      warrantyMonths,
      includedAccessories,
      description,
      images,
      isFeatured,
      isPremium,
      touchScreen,
      color,
      bestFor,
      warrantyText,
      warrantyDuration,
    } = body;

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        brand,
        model,
        processor,
        ram,
        storage,
        screen,
        gpu,
        touchScreen,
        color,
        bestFor,
        warrantyText,
        warrantyDuration,
        batteryHealth: batteryHealth !== undefined ? Number(batteryHealth) : undefined,
        conditionGrade,
        price: price !== undefined ? Number(price) : undefined,
        originalPrice:
          originalPrice !== undefined ? Number(originalPrice) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        warrantyMonths:
          warrantyMonths !== undefined ? Number(warrantyMonths) : undefined,
        includedAccessories,
        description,
        images: Array.isArray(images)
          ? JSON.stringify(images)
          : typeof images === "string"
          ? images
          : undefined,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined,
        isPremium: isPremium !== undefined ? Boolean(isPremium) : undefined,
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
