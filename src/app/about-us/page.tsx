import React from "react";
import Link from "next/link";
import { Store, Award, Star, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Viraj Infotech | Two Decades of Legacy in Mumbai",
  description:
    "Learn about Viraj Infotech (VirajIT) — Mumbai's trusted refurbished laptop and repair store in Kandivali West with 20+ years of legacy and 4.9 Google rating.",
};

export default function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
          ABOUT VIRAJ INFOTECH
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Two Decades of Trusted Computing in Mumbai
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded with a mission to make enterprise-grade technology accessible and affordable,{" "}
          <strong>Viraj Infotech (VirajIT)</strong> has served thousands of students, working professionals, and businesses from our Kandivali West store.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-2 shadow-sm">
          <Store className="w-7 h-7 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">Local Store in Kandivali West</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Customers can walk in, test multiple Dell Latitude and HP EliteBook configurations side-by-side, and get genuine after-sales support.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-2 shadow-sm">
          <Award className="w-7 h-7 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">Two Decades of Legacy</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Over 20 years of hands-on expertise in laptop sales, chip-level motherboard repairs, rentals, and corporate AMC across Mumbai.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-2 shadow-sm">
          <Star className="w-7 h-7 text-amber-500 fill-amber-500" />
          <h2 className="text-lg font-black text-slate-900">
            Rated 4.9 on Google by Hundreds of Verified Users
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our reputation is built on transparent grading, zero hidden costs, complimentary accessories, and dependable warranty support.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-2 shadow-sm">
          <ShieldCheck className="w-7 h-7 text-brand-600" />
          <h2 className="text-lg font-black text-slate-900">
            Authorised Partner &amp; Distributor
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Authorised Partner and Distributors of leading global brands like{" "}
            <strong>MSI, DELL, EPSON, and ACER</strong>.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-forest-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black">Ready to Upgrade Your Laptop?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Explore our certified refurbished inventory starting at ₹21,990.
          </p>
        </div>
        <Link
          href="/refurbished-laptops-catalogue"
          className="px-6 py-3 rounded-xl bg-lime-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shrink-0"
        >
          <span>Browse Laptops</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
