"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useStockLock } from "@/context/LockContext";
import { useEnquiryModal } from "@/context/EnquiryModalContext";
import {
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { activeLocks } = useStockLock();
  const { openEnquiryModal } = useEnquiryModal();
  const [isShortlisted, setIsShortlisted] = useState(false);

  const myLock = activeLocks.find((l) => l.productId === product.id);
  const isLockedByMe = !!myLock || product.isLockedByMe;

  const availableStock = product.availableStock !== undefined ? product.availableStock : product.stock;
  const isHeldByOthers = availableStock <= 0 && (product.activeLocksCount || 0) > 0 && !isLockedByMe;

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    ];
  }
  const coverImage =
    images[0] ||
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80";

  // Direct INR price from catalogue
  const inrPrice = Math.round(product.price);
  const inrOriginal = Math.round(product.originalPrice);
  const savingsAmount = Math.max(0, inrOriginal - inrPrice);
  const savingsPercent =
    inrOriginal > inrPrice ? Math.round((savingsAmount / inrOriginal) * 100) : 0;

  const productHref = `/products/${product.slug || product.id}`;

  const badgeLabel = product.isPremium
    ? "PREMIUM CONFIG"
    : product.isFeatured
    ? "POPULAR PICK"
    : savingsPercent >= 45
    ? `SAVE ${savingsPercent}%`
    : "BEST VALUE";

  return (
    <div
      className={`group relative flex flex-col bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
        isLockedByMe
          ? "border-amber-500 ring-2 ring-amber-400"
          : isHeldByOthers
          ? "border-purple-300 bg-cream-50"
          : "border-cream-300/80 hover:border-brand-600/50"
      }`}
    >
      {/* Top Banner / Mockup Visual */}
      <div className="relative w-full h-56 bg-cream-200 flex items-center justify-center p-6 overflow-hidden">
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-md bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
            {badgeLabel}
          </span>
          {savingsPercent > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              Save {savingsPercent}%
            </span>
          )}
        </div>

        {/* Shortlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsShortlisted(!isShortlisted);
          }}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors"
          title="Save to Shortlist"
        >
          <Heart className={`w-4 h-4 ${isShortlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Laptop Screen Illustration / Photo Container */}
        <Link
          href={productHref}
          className="relative w-full h-40 max-w-[240px] rounded-xl bg-forest-900 border-4 border-slate-800 shadow-xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={coverImage}
            alt={product.name}
            fill
            className="object-cover opacity-65 mix-blend-overlay"
          />
          <div className="relative z-10 text-center space-y-0.5 px-3">
            <span className="font-extrabold text-lg tracking-wider text-lime-400 font-sans uppercase">
              {product.brand}
            </span>
            <div className="text-xs font-bold text-white tracking-wide">
              {product.model}
            </div>
            <div className="text-[10px] font-semibold text-slate-300">
              {product.screen}
            </div>
          </div>
        </Link>

        {/* Quick Specs View on Bottom Right */}
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(product)}
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-slate-900 hover:text-white text-slate-700 text-[11px] font-bold shadow-sm transition-all flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Brand • Best For • Color */}
          <div className="flex items-center justify-between text-xs text-brand-600 font-black uppercase tracking-wider mb-1">
            <span>
              {product.brand} • {product.bestFor || "Office"} Use
            </span>
            <span className="text-[11px] text-slate-500 font-bold capitalize">
              {product.color || "Black"}
            </span>
          </div>

          <Link href={productHref}>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Specs Snippet */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs text-slate-700">
            <span className="bg-cream-100 px-2.5 py-1 rounded-md border border-cream-300 font-semibold">
              {product.processor}
            </span>
            <span className="bg-cream-100 px-2.5 py-1 rounded-md border border-cream-300 font-semibold">
              {product.ram} RAM
            </span>
            <span className="bg-cream-100 px-2.5 py-1 rounded-md border border-cream-300 font-semibold">
              {product.storage}
            </span>
            <span className="bg-cream-100 px-2.5 py-1 rounded-md border border-cream-300 font-semibold">
              {product.screen}
            </span>
            {product.touchScreen === "Yes" && (
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200 font-bold">
                Touch Screen
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Action Section */}
        <div className="pt-3 border-t border-cream-200 space-y-3">
          {/* Price display on Right & Warranty on Left */}
          <div className="flex items-end justify-between gap-2">
            <div className="text-left">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-700 bg-brand-50 px-2 py-1 rounded-md border border-brand-200">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                {product.warrantyText || "Warranty Included"}
              </span>
              {product.warrantyDuration && (
                <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                  {product.warrantyDuration}
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-2xl font-black text-slate-900 font-sans">
                  ₹{inrPrice.toLocaleString("en-IN")}
                </span>
                {inrOriginal > inrPrice && (
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    ₹{inrOriginal.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {savingsAmount > 0 && (
                <div className="text-[11px] font-bold text-emerald-700">
                  Save ₹{savingsAmount.toLocaleString("en-IN")} ({savingsPercent}% OFF)
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: WhatsApp Enquire + View Details */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                openEnquiryModal({
                  productName: `${product.brand} ${product.model} (₹${inrPrice.toLocaleString("en-IN")})`,
                })
              }
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>

            <Link
              href={productHref}
              className="py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
