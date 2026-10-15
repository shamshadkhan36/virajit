import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function makeSlug(brand: string, model: string, processor: string, display: string, index: number) {
  const raw = `${brand}-${model}-${processor}-${display}-refurbished`;
  const clean = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${clean}-${Date.now().toString().slice(-4)}${index}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, mode = "append" } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid laptop rows found in CSV." },
        { status: 400 }
      );
    }

    if (mode === "replace") {
      await prisma.stockLock.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.product.deleteMany({});
    }

    const createdProducts = [];

    for (let i = 0; i < items.length; i++) {
      const row = items[i];
      const brand = (row.brand || "Dell").trim();
      const model = (row.model || "Latitude").trim();
      const processor = (row.processor || "Intel Core i5").trim();
      const ram = (row.ram || "8GB").trim();
      const storage = (row.storage || "256GB SSD").trim();
      const screen = (row.screen || row.display || '14" FHD').trim();
      const touchScreen =
        String(row.touchScreen || "No").toLowerCase().startsWith("y") ||
        screen.toLowerCase().includes("touch")
          ? "Yes"
          : "No";
      const price = Number(String(row.price || 22299).replace(/[^0-9.]/g, "")) || 22299;
      const originalPrice =
        Number(String(row.originalPrice || Math.round(price * 1.8)).replace(/[^0-9.]/g, "")) ||
        Math.round(price * 1.8);
      const color = (row.color || "Black").trim();
      const bestFor = (row.bestFor || "Office").trim();
      const warrantyText = (row.warrantyText || "Warranty Included").trim();
      const warrantyDuration = (row.warrantyDuration || "1 MONTH").trim().toUpperCase();
      const warrantyMonths = parseInt(warrantyDuration, 10) || 1;
      const statusText = String(row.status || "In stock").toLowerCase();
      const stock =
        row.stock !== undefined && row.stock !== ""
          ? Number(row.stock)
          : statusText.includes("out")
          ? 0
          : 2;

      const isFeatured =
        String(row.isFeatured || "No").toLowerCase() === "yes" ||
        String(row.isFeatured || "").toLowerCase() === "true";
      const isPremium =
        String(row.isPremium || "").toLowerCase() === "yes" ||
        String(row.isPremium || "").toLowerCase() === "true" ||
        price >= 37000 ||
        touchScreen === "Yes";

      const name =
        row.name && row.name.trim()
          ? row.name.trim()
          : `${brand.toUpperCase()} ${model} | ${processor} | ${screen} | Refurbished`;

      const slug = makeSlug(brand, model, processor, screen, i);

      const defaultImgs = [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
      ];

      const customImgs = [row.image1, row.image2, row.image3]
        .map((u) => (u ? String(u).trim() : ""))
        .filter((u) => u.startsWith("http") || u.startsWith("/"));

      const finalImages = customImgs.length > 0 ? customImgs : defaultImgs;

      const saveAmount = Math.max(0, originalPrice - price);
      const savePercent =
        originalPrice > price ? Math.round((saveAmount / originalPrice) * 100) : 0;

      const description =
        row.description && row.description.trim()
          ? row.description.trim()
          : `Certified refurbished ${brand} ${model} powered by ${processor} with ${ram} RAM and fast ${storage}. Features a crisp ${screen} display (${
              touchScreen === "Yes" ? "Touch Screen enabled" : "Anti-Glare panel"
            }) in ${color} finish. Ideal for ${bestFor}, business multitasking, and everyday productivity. Tested across 40+ quality checkpoints at Viraj Infotech, Kandivali West with ${warrantyText} (${warrantyDuration}) and instant savings of ₹${saveAmount.toLocaleString("en-IN")} (${savePercent}% OFF).`;

      const created = await prisma.product.create({
        data: {
          slug,
          name,
          brand,
          model,
          processor,
          ram,
          storage,
          screen,
          gpu: row.gpu || "Intel HD / Iris Integrated Graphics",
          touchScreen,
          color,
          bestFor,
          warrantyText,
          warrantyDuration,
          batteryHealth: Number(row.batteryHealth) || 94,
          conditionGrade: row.conditionGrade || "Grade A+ (Pristine)",
          price,
          originalPrice,
          stock,
          warrantyMonths,
          includedAccessories:
            row.includedAccessories ||
            "Original Adapter & Power Cord, Free Laptop Bag & Wireless Mouse, Viraj Infotech Warranty Card",
          description,
          images: JSON.stringify(finalImages),
          isFeatured,
          isPremium,
        },
      });

      createdProducts.push(created);
    }

    return NextResponse.json({
      success: true,
      count: createdProducts.length,
      products: createdProducts,
    });
  } catch (error: any) {
    console.error("Bulk upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to import CSV data." },
      { status: 500 }
    );
  }
}
