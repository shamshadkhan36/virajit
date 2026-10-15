"use client";

import React from "react";
import { useStockLock } from "@/context/LockContext";
import { Lock, ArrowRight, X, Clock, ShieldCheck } from "lucide-react";

export const StickyHoldBar: React.FC = () => {
  const { activeLocks, openCheckout, releaseLock, formatTime } = useStockLock();

  if (activeLocks.length === 0) return null;

  const lock = activeLocks[0];
  const product = lock.product;
  if (!product) return null;

  const totalTime = 600; // 10 minutes in seconds
  const progressPercent = Math.max(0, Math.min(100, (lock.secondsRemaining / totalTime) * 100));

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-xl border-t border-amber-300 shadow-2xl">
      {/* Top progress bar for time left */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-cream-200">
        <div
          className={`h-full transition-all duration-1000 ${
            lock.secondsRemaining < 120
              ? "bg-red-500 animate-pulse"
              : lock.secondsRemaining < 300
              ? "bg-amber-500"
              : "bg-brand-600"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left side: Lock notification & Product */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 shadow-sm">
            <Lock className="w-5 h-5 text-amber-700 animate-bounce" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                1 Unit Reserved Exclusively For You
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                Price Locked
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 truncate max-w-md">
              {product.name}
            </p>
          </div>
        </div>

        {/* Right side: Countdown & Action buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex flex-col items-end px-3 py-1 bg-cream-100 border border-cream-300 rounded-xl shadow-inner">
            <span className="text-[10px] uppercase font-bold text-slate-500">Hold Timer</span>
            <span className={`text-base font-mono font-black ${
              lock.secondsRemaining < 120 ? "text-red-600" : "text-amber-800"
            }`}>
              {formatTime(lock.secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => releaseLock(product.id)}
            className="px-3 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-700 hover:text-slate-900 border border-cream-300 text-xs font-bold transition-colors flex items-center gap-1"
            title="Release lock to let other shoppers buy"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Release</span>
          </button>

          <button
            onClick={() => openCheckout(product)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-brand-600/25 transition-all transform hover:scale-[1.02]"
          >
            <span>Complete Order (₹{Math.round(product.price).toLocaleString('en-IN')})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
