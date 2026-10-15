import React from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Mail,
  Store,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Visit Viraj Infotech Store in Kandivali West, Mumbai | Contact Us",
  description:
    "Visit Viraj Infotech in Kandivali West, Mumbai. Test refurbished Dell & HP laptops in person, book chip-level repairs, or get directions and opening hours.",
};

export default function VisitStorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
          KANDIVALI WEST • MUMBAI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Us &amp; Visit The Store
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Experience our refurbished laptop range hands-on at our Kandivali West store with guidance from our skilled technicians.
        </p>
      </div>

      <div className="rounded-[32px] bg-white border border-cream-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Store Photo */}
        <div className="lg:col-span-5 relative min-h-[320px] bg-forest-900">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
            alt="Viraj Infotech Store Kandivali West"
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black uppercase">
              20+ Years in Mumbai
            </span>
            <h2 className="text-2xl font-black mt-2">Viraj Infotech</h2>
            <p className="text-xs text-slate-300">
              Refurbished Laptops • Laptop Repair • Rentals &amp; AMC
            </p>
          </div>
        </div>

        {/* Store Details */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <MapPin className="w-4 h-4" />
                <span>Store Address</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Viraj Infotech, Shop No. 4, Near Kandivali Railway Station, S.V. Road, Kandivali West, Mumbai – 400067
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <Clock className="w-4 h-4" />
                <span>Opening Hours</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                <strong>Mon – Sat:</strong> 10:00 AM – 8:30 PM
                <br />
                <strong>Sunday:</strong> 11:00 AM – 6:00 PM
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <Phone className="w-4 h-4" />
                <span>For Sales</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-bold">Phone: +91 89287 15729</p>
              <p className="text-xs text-slate-600">Email: sales@virajit.com</p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <Mail className="w-4 h-4" />
                <span>For Support &amp; Repair</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-bold">Phone: +91 89287 15729</p>
              <p className="text-xs text-slate-600">Email: support@virajit.com</p>
            </div>
          </div>

          {/* 3 Primary CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <a
              href="tel:+918928715729"
              className="py-3.5 px-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 89287 15729</span>
            </a>

            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20want%20to%20visit%20your%20Kandivali%20West%20store"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://share.google/SCAKjT9NThGEm3CPB"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
