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
        className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Viraj IT Plum & Signature Pink Brand Palette */}
        <div className="bg-gradient-to-br from-[#32123b] via-[#260b2d] to-[#1a061f] text-white p-6 sm:p-7 relative border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b30c7a] to-[#d6298b] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#b30c7a]/30 border border-white/15">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 text-[10px] font-black uppercase tracking-wider">
                  Instant Connect
                </span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                Enquire on WhatsApp
              </h2>
            </div>
          </div>

          <p className="text-xs text-pink-100/90 font-medium mt-2 leading-relaxed">
            Please share your name, number and location so our Kandivali West team can assist you right away.
          </p>

          {productName && (
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm text-xs text-white border border-white/15 max-w-full truncate">
              <span className="text-pink-300 font-extrabold uppercase text-[10px] tracking-wider">Product:</span>
              <span className="font-black text-white truncate">{productName}</span>
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
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1.5">
                Your Name <span className="text-[#b30c7a]">*</span>
              </label>
              <div className="relative group">
                <User className="w-4 h-4 text-slate-400 group-focus-within:text-[#b30c7a] transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-[#b30c7a] focus:ring-4 focus:ring-[#b30c7a]/15 text-sm font-semibold text-[#0f0e17] transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1.5">
                Phone / WhatsApp Number <span className="text-[#b30c7a]">*</span>
              </label>
              <div className="relative group">
                <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-[#b30c7a] transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98201 54321"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-[#b30c7a] focus:ring-4 focus:ring-[#b30c7a]/15 text-sm font-semibold text-[#0f0e17] transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-900 mb-1.5">
                Your Location in Mumbai <span className="text-[#b30c7a]">*</span>
              </label>
              <div className="relative group">
                <MapPin className="w-4 h-4 text-slate-400 group-focus-within:text-[#b30c7a] transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kandivali West, Borivali, Malad..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-[#b30c7a] focus:ring-4 focus:ring-[#b30c7a]/15 text-sm font-semibold text-[#0f0e17] transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-5 rounded-xl bg-[#b30c7a] hover:bg-[#97086a] text-white font-black text-sm tracking-wide shadow-lg shadow-[#b30c7a]/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Continue to WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Micro-Trust Strip */}
          <div className="pt-3 border-t border-slate-200 text-center text-[11px] text-slate-600 font-medium">
            🔒 Your enquiry is securely saved &amp; sent directly to Viraj Infotech store staff.
          </div>
        </div>
      </div>
    </div>
  );
}
