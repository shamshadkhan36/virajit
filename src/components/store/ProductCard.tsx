"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    ];
  }
  // Filter out any non-laptop placeholder images (e.g. legacy book image photo-1544716278)
  const laptopImages = (Array.isArray(images) ? images : []).filter(
    (img) => typeof img === "string" && !img.includes("1544716278")
  );
  const defaultLaptopImage =
    product.brand?.toUpperCase() === "HP"
      ? "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
      : "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80";

  const coverImage = laptopImages[0] || defaultLaptopImage;

  const inrPrice = Math.round(product.price);
  const inrOriginal = Math.round(product.originalPrice || product.price * 1.6);
  const savingsAmount = Math.max(0, inrOriginal - inrPrice);
  const savingsPercent =
    inrOriginal > inrPrice ? Math.round((savingsAmount / inrOriginal) * 100) : 46;

  const productHref = `/products/${product.slug || product.id}`;

  const displayName = product.name.startsWith("Refurbished")
    ? product.name
    : `Refurbished ${product.brand} ${product.model} | ${product.processor} | ${product.screen || '14" FHD'}`;

  const ramText = product.ram.includes("RAM") ? product.ram : `${product.ram} RAM`;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-4 sm:p-5">
      {/* 1. Image */}
      <div className="relative w-full h-48 sm:h-52 bg-[#fbf9fb] rounded-2xl flex items-center justify-center p-3 overflow-hidden mb-3.5 border border-slate-100">
        <Image
          src={coverImage}
          alt={displayName}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* 2. Title */}
      <Link href={productHref} className="block mb-3">
        <h3 className="text-base sm:text-[17px] font-black text-[#0f0e17] leading-snug line-clamp-2 hover:text-[#b30c7a] transition-colors min-h-[46px]">
          {displayName}
        </h3>
      </Link>

      {/* 3. Bubbles */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        <span className="bg-[#f4ecf4] text-[#0f0e17] px-2.5 py-1 rounded-full text-xs sm:text-[13px] font-bold border border-[#eaddeb]">
          {product.processor}
        </span>
        <span className="bg-[#f4ecf4] text-[#0f0e17] px-2.5 py-1 rounded-full text-xs sm:text-[13px] font-bold border border-[#eaddeb]">
          {ramText}
        </span>
        <span className="bg-[#f4ecf4] text-[#0f0e17] px-2.5 py-1 rounded-full text-xs sm:text-[13px] font-bold border border-[#eaddeb]">
          {product.storage}
        </span>
      </div>

      {/* 4. Price Row */}
      <div className="flex items-baseline gap-2.5 mb-2 mt-auto">
        <span className="text-xl sm:text-2xl font-black text-[#0f0e17] font-sans">
          ₹ {inrPrice.toLocaleString("en-IN")}
        </span>
        {inrOriginal > inrPrice && (
          <span className="text-sm sm:text-base text-slate-700 line-through font-bold">
            ₹ {inrOriginal.toLocaleString("en-IN")}
          </span>
        )}
        {savingsPercent > 0 && (
          <span className="px-2 py-0.5 rounded-md bg-[#dcfce7] text-[#15803d] text-xs sm:text-[13px] font-black">
            {savingsPercent}% off
          </span>
        )}
      </div>

      {/* 5. Warranty Included */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#15803d] mb-3.5">
        <span aria-hidden="true" className="font-black text-sm">✓</span>
        <span>Warranty Included</span>
      </div>

      {/* 6. Button - View Details (pink color) */}
      {onViewDetails ? (
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="w-full py-3 px-4 rounded-xl bg-[#b30c7a] hover:bg-[#97086a] text-white font-black text-sm shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
        </button>
      ) : (
        <Link
          href={productHref}
          className="w-full py-3 px-4 rounded-xl bg-[#b30c7a] hover:bg-[#97086a] text-white font-black text-sm shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
        </Link>
      )}
    </article>
  );
};
