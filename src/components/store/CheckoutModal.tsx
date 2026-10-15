"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStockLock } from "@/context/LockContext";
import {
  X,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  AlertCircle,
  Clock,
  Printer,
} from "lucide-react";

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    currentLockedProduct,
    activeLocks,
    releaseLock,
    formatTime,
    sessionToken,
    refreshLocks,
  } = useStockLock();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "Mumbai",
    postalCode: "400001",
    paymentMethod: "UPI / Online Payment",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);

  if (!isCheckoutOpen || !currentLockedProduct) return null;

  const myLock = activeLocks.find((l) => l.productId === currentLockedProduct.id);
  const lockSeconds = myLock ? myLock.secondsRemaining : currentLockedProduct.lockSecondsRemaining || 0;

  let images: string[] = [];
  try {
    images = JSON.parse(currentLockedProduct.images);
  } catch {
    images = ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"];
  }

  const inrPrice = Math.round(currentLockedProduct.price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: currentLockedProduct.id,
          sessionToken,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to complete checkout.");
        setIsSubmitting(false);
        return;
      }

      setCompletedOrder(data.order);
      await refreshLocks();
      setIsSubmitting(false);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCompletedOrder(null);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-cream-300 rounded-[32px] shadow-2xl overflow-hidden text-slate-900 my-6">
        {/* Top Hold Timer Banner */}
        {!completedOrder && (
          <div className="bg-amber-500 px-6 py-3 flex items-center justify-between text-slate-950 font-black text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 animate-bounce" />
              <span>1 Unit Reserved Exclusively For You</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/10 px-3 py-1 rounded-lg text-slate-950 font-mono text-sm sm:text-base font-black">
              <Clock className="w-4 h-4" />
              <span>{formatTime(lockSeconds)}</span>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-cream-100 text-slate-600 hover:text-slate-900 border border-cream-200 transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Confirmed Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto text-brand-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-black uppercase tracking-wider">
                Order Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Thank You, {completedOrder.customerName}!
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Your order <strong className="text-slate-900 font-mono">{completedOrder.orderNumber}</strong> has been confirmed and 1 unit was permanently deducted from stock.
              </p>
            </div>

            <div className="p-5 bg-cream-100 rounded-2xl border border-cream-300 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500">Item:</span>
                <span className="text-slate-900 font-bold">{currentLockedProduct.name}</span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500">Amount:</span>
                <span className="text-brand-700 font-black font-sans text-sm">
                  ₹{inrPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between border-b border-cream-200 pb-2">
                <span className="text-slate-500">Shipping Address:</span>
                <span className="text-slate-900 font-medium">
                  {completedOrder.shippingAddress}, {completedOrder.city} {completedOrder.postalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="text-slate-900 font-bold">1-2 Business Days (Local Mumbai Express)</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-700 text-xs font-bold flex items-center gap-2 transition-colors border border-cream-300"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-black transition-colors"
              >
                Back to Catalog
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Product Summary Row */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-cream-100 border border-cream-300">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-cream-200">
                <Image
                  src={images[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80"}
                  alt={currentLockedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-brand-600 uppercase">
                    {currentLockedProduct.conditionGrade}
                  </span>
                  <span className="text-xs text-slate-500">• 6M Warranty</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                  {currentLockedProduct.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-lg font-black text-slate-900 font-sans">
                    ₹{inrPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-slate-500">Free Express Delivery</span>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Shipping & Contact Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Customer & Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="rahul@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai / Thane / Navi Mumbai"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    name="shippingAddress"
                    required
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    placeholder="Shop/Flat No, Building, Street"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label className={`flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "UPI / Online Payment"
                      ? "bg-brand-50 border-brand-600 text-brand-900 font-bold"
                      : "bg-cream-50 border-cream-300 text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI / Online Payment"
                      checked={formData.paymentMethod === "UPI / Online Payment"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <CreditCard className="w-4 h-4 text-brand-600" />
                    <span>UPI / GPay / Card</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "Cash on Delivery"
                      ? "bg-brand-50 border-brand-600 text-brand-900 font-bold"
                      : "bg-cream-50 border-cream-300 text-slate-600"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === "Cash on Delivery"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Banknote className="w-4 h-4 text-brand-600" />
                    <span>Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => releaseLock(currentLockedProduct.id)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
                >
                  Release Hold & Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing Order...</span>
                  ) : (
                    <>
                      <span>Confirm Order (₹{inrPrice.toLocaleString("en-IN")})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
