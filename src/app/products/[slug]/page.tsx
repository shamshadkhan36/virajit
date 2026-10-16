"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { useStockLock } from "@/context/LockContext";
import { useEnquiryModal } from "@/context/EnquiryModalContext";
import { ProductCard } from "@/components/store/ProductCard";
import {
  Cpu,
  HardDrive,
  Monitor,
  ShieldCheck,
  Lock,
  MessageCircle,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Truck,
  Gift,
  Wrench,
  Laptop,
  RefreshCw,
  Clock,
  CreditCard,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { sessionToken, lockProduct, openCheckout, activeLocks, formatTime, isLoadingLock } =
    useStockLock();
  const { openEnquiryModal } = useEnquiryModal();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const url = sessionToken
          ? `/api/products/${encodeURIComponent(slug)}?sessionToken=${encodeURIComponent(sessionToken)}`
          : `/api/products/${encodeURIComponent(slug)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
        }

        const allRes = await fetch("/api/products");
        const allData = await allRes.json();
        if (allData.success && allData.products) {
          setRelatedProducts(
            allData.products
              .filter((p: Product) => p.slug !== slug && p.id !== slug)
              .slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadProductData();
    }
  }, [slug, sessionToken]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
        <p className="text-sm font-bold text-slate-600">Loading laptop specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <Laptop className="w-12 h-12 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-black text-slate-900">Laptop Not Found</h1>
        <p className="text-sm text-slate-600">
          The refurbished laptop you are looking for may have been sold or moved.
        </p>
        <Link
          href="/refurbished-laptops-catalogue"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white text-sm font-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Refurbished Laptops
        </Link>
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    ];
  }
  while (images.length < 3) {
    images.push(
      images[0] ||
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80"
    );
  }

  const inrPrice = Math.round(product.price);
  const inrOriginal = Math.round(product.originalPrice);
  const saveAmount = Math.max(0, inrOriginal - inrPrice);
  const savePercent =
    inrOriginal > inrPrice ? Math.round((saveAmount / inrOriginal) * 100) : 0;

  const myLock = activeLocks.find((l) => l.productId === product.id);
  const isLockedByMe = !!myLock || product.isLockedByMe;
  const lockSeconds = myLock ? myLock.secondsRemaining : product.lockSecondsRemaining || 0;
  const availableStock =
    product.availableStock !== undefined ? product.availableStock : product.stock;

  const whatsappText = encodeURIComponent(
    `Hi Viraj Infotech, I'm interested in buying "${product.name}" listed at ₹${inrPrice.toLocaleString("en-IN")} (Save ₹${saveAmount.toLocaleString("en-IN")}). Please share availability and store visit details.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/refurbished-laptops-catalogue" className="hover:text-brand-600">
          Refurbished Laptops
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-md">{product.name}</span>
      </nav>

      {/* Main Product 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 3-Image Product Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-3xl bg-forest-900 border-4 border-slate-800 overflow-hidden shadow-xl flex items-center justify-center">
            <Image
              src={images[activeImageIdx]}
              alt={`${product.name} - Image ${activeImageIdx + 1}`}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-slate-950/90 text-lime-400 text-xs font-black uppercase tracking-wider">
                {product.brand} Certified Refurbished
              </span>
              {savePercent > 0 && (
                <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black uppercase tracking-wider">
                  Save - {savePercent}% (₹{saveAmount.toLocaleString("en-IN")})
                </span>
              )}
            </div>
            <div className="relative z-10 text-center bg-slate-950/75 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15">
              <div className="text-xs font-black uppercase tracking-widest text-lime-400">
                {product.brand}
              </div>
              <div className="text-xl font-black text-white mt-0.5">{product.model}</div>
              <div className="text-xs text-slate-300 font-semibold mt-0.5">
                {product.processor} • {product.ram} • {product.storage}
              </div>
            </div>
          </div>

          {/* 3 Product Image Thumbnails (Product images 1, 2, 3 from Excel sheet) */}
          <div className="grid grid-cols-3 gap-4">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx
                    ? "border-brand-600 ring-2 ring-brand-600/30 scale-[1.02]"
                    : "border-cream-300 opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold">
                  View {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Pricing, Key Specs, Warranty & Enquiry CTAs */}
        <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-cream-300 shadow-sm">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-black uppercase">
                {product.stock > 0 ? "In Stock • Ready at Kandivali Store" : "Out of Stock"}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase">
                {product.warrantyText || "Warranty Included"} ({product.warrantyDuration || "1 MONTH"})
              </span>
            </div>

            {/* Product Title per Product Fields sheet */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Selling Price, Original Price, Save - X% Box */}
          <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                VirajIT Refurbished Price
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 font-sans">
                  ₹{inrPrice.toLocaleString("en-IN")}
                </span>
                {inrOriginal > inrPrice && (
                  <span className="text-base text-slate-400 line-through font-bold">
                    ₹{inrOriginal.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {saveAmount > 0 && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black">
                  <span>Save - {savePercent}%</span>
                  <span>•</span>
                  <span>You Save ₹{saveAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            <div className="sm:text-right space-y-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-cream-300">
              <div className="text-xs font-extrabold text-brand-700 flex sm:justify-end items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Free Accessories Included
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Original Charger + Bag + Mouse
              </div>
              <Link
                href="/refurbished-laptops-on-emi"
                className="inline-flex items-center gap-1 text-xs font-black text-brand-600 hover:underline pt-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                Available on Easy EMI →
              </Link>
            </div>
          </div>

          {/* Specifications Grid matching Excel Columns */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
              Key Hardware Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Brand &amp; Model</div>
                <div className="text-slate-900 font-black mt-0.5">
                  {product.brand} {product.model}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Processor</div>
                <div className="text-slate-900 font-black mt-0.5">{product.processor}</div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">RAM</div>
                <div className="text-slate-900 font-black mt-0.5">{product.ram}</div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Storage</div>
                <div className="text-slate-900 font-black mt-0.5">{product.storage}</div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Display</div>
                <div className="text-slate-900 font-black mt-0.5">{product.screen}</div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Touch Screen</div>
                <div className="text-slate-900 font-black mt-0.5">
                  {product.touchScreen || "No"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Color</div>
                <div className="text-slate-900 font-black mt-0.5 capitalize">
                  {product.color || "Black"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Best For</div>
                <div className="text-slate-900 font-black mt-0.5">
                  {product.bestFor || "Office"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-cream-50 border border-cream-200">
                <div className="text-slate-400 font-semibold">Warranty</div>
                <div className="text-emerald-700 font-black mt-0.5">
                  {product.warrantyText || "Warranty Included"} ({product.warrantyDuration || "1 MONTH"})
                </div>
              </div>
            </div>
          </div>

          {/* Customer Action: Enquire through WhatsApp, Phone, Store Visit */}
          <div className="space-y-3 pt-2">
            <div>
              <button
                type="button"
                onClick={() =>
                  openEnquiryModal({
                    productName: `${product.brand} ${product.model} (₹${inrPrice.toLocaleString("en-IN")})`,
                  })
                }
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+918928715729"
                className="py-3 px-4 rounded-xl bg-cream-100 hover:bg-cream-200 border border-cream-300 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Call: +91 89287 15729</span>
              </a>
              <Link
                href="/virajit-laptop-store-kandivali-west"
                className="py-3 px-4 rounded-xl bg-cream-100 hover:bg-cream-200 border border-cream-300 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Visit Kandivali Store</span>
              </Link>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </div>
        </div>
      </div>

      {/* Trust Strip on Product Page */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Truck, title: "Delivery across Mumbai", desc: "Fast & safe doorstep delivery" },
          { icon: Laptop, title: "Laptop on Loan", desc: "Zero downtime backup support" },
          { icon: Wrench, title: "Skilled Technicians", desc: "40+ point quality tested" },
          { icon: Gift, title: "Free Accessories", desc: "Bag, mouse & charger included" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white border border-cream-300 flex items-center gap-3.5 shadow-sm"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Related Laptops */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-cream-300 pb-4">
            <h2 className="text-2xl font-black text-slate-900">
              More Refurbished Laptops in Stock
            </h2>
            <Link
              href="/refurbished-laptops-catalogue"
              className="text-xs font-black text-brand-600 hover:underline flex items-center gap-1"
            >
              View All Laptops <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
