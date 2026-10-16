"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle, User, Phone, MapPin, Sparkles, ArrowRight } from "lucide-react";

interface WhatsAppEnquiryModalProps {
  isOpen: boolean;
  productName?: string;
  customMessage?: string;
  onClose: () => void;
}

export function WhatsAppEnquiryModal({
  isOpen,
  productName = "",
  customMessage = "",
  onClose,
}: WhatsAppEnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-fill from localStorage if previously entered
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("virajit_lead_name") || "";
      const savedPhone = localStorage.getItem("virajit_lead_phone") || "";
      const savedLoc = localStorage.getItem("virajit_lead_location") || "";
      if (savedName) setName(savedName);
      if (savedPhone) setPhone(savedPhone);
      if (savedLoc) setLocation(savedLoc);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanLocation = location.trim();

    if (!cleanName) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (!cleanPhone) {
      setErrorMessage("Please enter your phone number");
      return;
    }
    if (!cleanLocation) {
      setErrorMessage("Please enter your location");
      return;
    }

    setIsSubmitting(true);

    // Save to localStorage for convenience
    try {
      localStorage.setItem("virajit_lead_name", cleanName);
      localStorage.setItem("virajit_lead_phone", cleanPhone);
      localStorage.setItem("virajit_lead_location", cleanLocation);
    } catch {
      // Ignored if localstorage unavailable
    }

    // Build the pre-filled WhatsApp message
    let waText = "";
    if (customMessage) {
      waText = `${customMessage}\n\n*Name:* ${cleanName}\n*Phone:* ${cleanPhone}\n*Location:* ${cleanLocation}`;
    } else if (productName) {
      waText = `Hi Viraj Infotech, my name is ${cleanName} from ${cleanLocation}. I am interested in *${productName}*. Please share availability, store visit details and best price.`;
    } else {
      waText = `Hi Viraj Infotech, my name is ${cleanName} from ${cleanLocation}. I would like to enquire about your refurbished laptop deals.`;
    }

    const waUrl = `https://wa.me/918928715729?text=${encodeURIComponent(waText)}`;

    // 1. Open WhatsApp immediately synchronously in the click/submit handler to avoid popup blockers
    const newWindow = window.open(waUrl, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      // If popup blocker intervened, redirect directly
      window.location.href = waUrl;
    }

    // 2. Save enquiry to Admin Database asynchronously
    try {
      fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          location: cleanLocation,
          productName: productName || "General WhatsApp Enquiry",
          message: `User redirected to WhatsApp with message: "${waText.substring(0, 120)}..."`,
        }),
      }).catch((err) => console.warn("Enquiry background save warning:", err));
    } catch (err) {
      console.warn("Enquiry save error:", err);
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl border border-cream-300 shadow-2xl overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip with Emerald WhatsApp Branding */}
        <div className="bg-emerald-600 text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                  Instant Connect
                </span>
                <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-white mt-0.5">
                Enquire on WhatsApp
              </h2>
            </div>
          </div>

          <p className="text-xs text-emerald-100 font-medium mt-2 leading-relaxed">
            Please share your name, number and location so our Kandivali West team can assist you right away.
          </p>

          {productName && (
            <div className="mt-3 inline-block px-3 py-1 rounded-xl bg-black/20 text-[11px] font-extrabold text-white border border-white/10 truncate max-w-full">
              Product: {productName}
            </div>
          )}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Phone / WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98201 54321"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">
                Your Location in Mumbai <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kandivali West, Borivali, Malad..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Continue to WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Micro-Trust Strip */}
          <div className="pt-3 border-t border-cream-200 text-center text-[11px] text-slate-500 font-medium">
            🔒 Your enquiry is securely saved &amp; sent directly to Viraj Infotech store staff.
          </div>
        </div>
      </div>
    </div>
  );
}
