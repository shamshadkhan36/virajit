import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
      slug,
    } = body;

    if (!name || !brand || !price) {
      return NextResponse.json(
        { success: false, error: "Name, brand, and price are required." },
        { status: 400 }
      );
    }

    const baseSlug = (slug || `${brand}-${model || name}-${processor || ""}-${screen || ""}-refurbished`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const product = await prisma.product.create({
      data: {
        slug: uniqueSlug,
        name,
        brand,
        model: model || name,
        processor: processor || "Intel Core i5",
        ram: ram || "8GB",
        storage: storage || "256GB SSD",
        screen: screen || '14" FHD',
        gpu: gpu || "Intel Integrated Graphics",
        touchScreen: touchScreen || "No",
        color: color || "Black",
        bestFor: bestFor || "Office",
        warrantyText: warrantyText || "Warranty Included",
        warrantyDuration: warrantyDuration || "1 MONTH",
        batteryHealth: Number(batteryHealth) || 95,
        conditionGrade: conditionGrade || "Grade A+ (Pristine)",
        price: Number(price),
        originalPrice: Number(originalPrice) || Math.round(Number(price) * 1.8),
        stock: Number(stock) !== undefined ? Number(stock) : 1,
        warrantyMonths: Number(warrantyMonths) || 1,
        includedAccessories:
          includedAccessories ||
          "Original Adapter & Power Cord, Free Laptop Bag & Wireless Mouse, Viraj Infotech Warranty Card",
        description: description || "Certified refurbished laptop tested by Viraj Infotech.",
        images: Array.isArray(images)
          ? JSON.stringify(images)
          : typeof images === "string"
          ? images
          : "[]",
        isFeatured: Boolean(isFeatured),
        isPremium: Boolean(isPremium),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
