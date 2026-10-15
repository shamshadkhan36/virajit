import React from "react";
import {
  Laptop,
  Calendar,
  Building2,
  Truck,
  ShieldCheck,
  MessageCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Laptop on Rent in Mumbai | Viraj Infotech Kandivali",
  description:
    "Rent Dell, HP, and Apple laptops in Mumbai for corporate teams, startups, events, and WFH. Flexible tenures, zero maintenance hassle, and doorstep delivery.",
};

export default function LaptopOnRentPage() {
  const rentalPlans = [
    {
      title: "Business & Office Laptop Rental",
      specs: "Intel Core i5 • 8GB / 16GB RAM • 256GB SSD • 14\" Display",
      idealFor: "Startups, remote employees, CA/accounting firms & training batches",
      badge: "MOST POPULAR",
    },
    {
      title: "High-Performance i7 & Touch Screen Rental",
      specs: "Intel Core i7 11th/12th Gen • 16GB / 32GB RAM • NVMe SSD",
      idealFor: "Developers, designers, heavy multitasking & corporate executives",
      badge: "POWER SERIES",
    },
    {
      title: "Short-Term Event & Exam Bulk Rentals",
      specs: "10 to 100+ Matched Dell/HP Laptops • Pre-configured Software",
      idealFor: "Corporate conferences, trade shows, hackathons & assessments",
      badge: "BULK READY",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Hero */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-forest-900 text-white shadow-2xl space-y-6">
        <span className="px-3 py-1 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider">
          FLEXIBLE IT RENTALS ACROSS MUMBAI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl leading-tight">
          Laptop on Rent in Mumbai — Fast Delivery &amp; Zero Maintenance Hassle
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Scale your team or get a temporary workstation without heavy upfront capital expenditure. Every rental laptop from Viraj Infotech comes fully tested with instant replacement support.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I'm%20looking%20for%20a%20Laptop%20on%20Rent%20in%20Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Get Rental Quote on WhatsApp</span>
          </a>
          <a
            href="tel:+918928715729"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-brand-600" />
            <span>Call Rental Desk: +91 89287 15729</span>
          </a>
        </div>
      </div>

      {/* Rental Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rentalPlans.map((plan, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-md bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-black uppercase tracking-wider">
                {plan.badge}
              </span>
              <h2 className="text-xl font-black text-slate-900">{plan.title}</h2>
              <p className="text-xs font-bold text-brand-600 bg-cream-100 p-3 rounded-xl border border-cream-300">
                {plan.specs}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">{plan.idealFor}</p>
            </div>

            <a
              href={`https://wa.me/918928715729?text=${encodeURIComponent(
                `Hi Viraj Infotech, please share rental rates for: ${plan.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs text-center transition-colors"
            >
              Enquire Rental Tariff →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
