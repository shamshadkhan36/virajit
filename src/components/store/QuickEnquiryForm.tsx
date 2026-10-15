"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, MapPin, User, MessageSquareText, Sparkles, MessageCircle } from "lucide-react";

interface QuickEnquiryFormProps {
  className?: string;
  productName?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export function QuickEnquiryForm({
  className = "",
  productName,
  title = "Quick Laptop Inquiry",
  subtitle = "Looking for a specific model or budget deal? Enter your details and our Kandivali West team will contact you immediately.",
  compact = false,
}: QuickEnquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number");
      return;
    }
    if (!location.trim()) {
      setErrorMessage("Please enter your location");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          location: location.trim(),
          productName: productName || "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setName("");
        setPhone("");
        setLocation("");
      } else {
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage("Network error. Please check your connection or contact us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4 ${className}`}
      >
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Inquiry Submitted Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 max-w-md mx-auto">
            Thank you! Our Kandivali West store team has received your details and will call or WhatsApp you shortly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all"
          >
            Submit Another Inquiry
          </button>
          <a
            href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20just%20submitted%20an%20inquiry%20on%20your%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black inline-flex items-center gap-1.5 shadow-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Chat Now on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-3xl border border-cream-300 bg-white shadow-lg overflow-hidden ${
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8"
      } ${className}`}
    >
      {/* Header */}
      <div className="space-y-1 mb-5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-brand-700 border border-pink-200 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-600" />
            Direct Store Callback
          </span>
          {productName && (
            <span className="text-[11px] font-bold text-slate-600 bg-cream-100 px-2 py-0.5 rounded-md border border-cream-200 truncate max-w-[200px]">
              For: {productName}
            </span>
          )}
        </div>
        <h3 className={`${compact ? "text-lg" : "text-xl sm:text-2xl"} font-black text-slate-900 tracking-tight`}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          {errorMessage}
        </div>
      )}

      {/* Small Inquiry Form with Name, Number, Location */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-semibold text-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-xs sm:text-sm tracking-wide shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Inquiry</span>
            </>
          )}
        </button>
      </form>

      {/* Trust Micro-Text */}
      <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>⚡ Quick callback within business hours</span>
        <a
          href="https://wa.me/918928715729"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:text-emerald-800 font-black inline-flex items-center gap-1"
        >
          <MessageCircle className="w-3 h-3 fill-emerald-600" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
