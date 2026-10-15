"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useStockLock } from "@/context/LockContext";
import {
  X,
  Cpu,
  HardDrive,
  Monitor,
  BatteryCharging,
  ShieldCheck,
  Lock,
  Package,
  Wrench,
  Zap,
  MessageCircle,
} from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { lockProduct, openCheckout, activeLocks, formatTime } = useStockLock();

  if (!product) return null;

  const myLock = activeLocks.find((l) => l.productId === product.id);
  const isLockedByMe = !!myLock || product.isLockedByMe;
  const lockSeconds = myLock ? myLock.secondsRemaining : product.lockSecondsRemaining || 0;
  const availableStock = product.availableStock !== undefined ? product.availableStock : product.stock;

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"];
  }

  const inrPrice = Math.round(product.price);
  const inrOriginal = Math.round(product.originalPrice);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-cream-300 rounded-[32px] shadow-2xl overflow-hidden text-slate-900 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-cream-100 text-slate-600 hover:text-slate-900 border border-cream-200 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media & Title Header */}
        <div className="relative h-64 sm:h-72 w-full bg-cream-200">
          <Image
            src={images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-brand-600 text-white shadow-sm">
                {product.brand} • {product.model}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 leading-tight">
                {product.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-brand-600 font-sans">
                ₹{inrPrice.toLocaleString("en-IN")}
              </span>
              {inrOriginal > inrPrice && (
                <div className="text-xs text-slate-400 line-through">
                  ₹{inrOriginal.toLocaleString("en-IN")}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <div className="bg-cream-100 p-4 rounded-2xl border border-cream-300 text-sm text-slate-700 leading-relaxed">
            {product.description}
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Hardware Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Processor (CPU)</div>
                  <div className="text-slate-900 font-bold">{product.processor}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-start gap-2.5">
                <HardDrive className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">RAM & Storage</div>
                  <div className="text-slate-900 font-bold">{product.ram} / {product.storage}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-start gap-2.5">
                <Monitor className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Display Panel</div>
                  <div className="text-slate-900 font-bold">{product.screen}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-500 font-semibold">Graphics (GPU)</div>
                  <div className="text-slate-900 font-bold">{product.gpu}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Check */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-brand-600 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 40-Point Diagnostic Report
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-center gap-2.5">
                <BatteryCharging className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-slate-500 font-medium">Battery Health</span>
                  <div className="text-emerald-700 font-bold">{product.batteryHealth}% Tested</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-slate-500 font-medium">Cosmetic Grade</span>
                  <div className="text-slate-900 font-bold">{product.conditionGrade}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cream-100 border border-cream-300 flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-amber-600" />
                <div>
                  <span className="text-slate-500 font-medium">Warranty</span>
                  <div className="text-amber-800 font-bold">{product.warrantyMonths}M Comprehensive</div>
                </div>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 flex items-start gap-3">
            <Package className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Included in Box:</span>
              <p className="text-slate-700 mt-0.5">{product.includedAccessories}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-cream-50 border-t border-cream-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {isLockedByMe ? (
              <span className="text-amber-800 font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-amber-700" /> 1 Unit Locked ({formatTime(lockSeconds)})
              </span>
            ) : (
              <span>Ready in stock • Fast local delivery</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hello Viraj Infotech, I am interested in ${product.name} (Price: ₹${product.price.toLocaleString(
                  "en-IN"
                )}). Is it currently available at your Kandivali West store?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
