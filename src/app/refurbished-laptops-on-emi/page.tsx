import React from "react";
import Link from "next/link";
import { CreditCard, ExternalLink, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops on EMI in Mumbai | Viraj Infotech",
  description:
    "Buy certified refurbished laptops on easy monthly EMI (3 to 12 months) via Snapmint, UPI, or Credit/Debit cards at Viraj Infotech, Kandivali West.",
};

export default function RefurbishedLaptopsOnEmiPage() {
  const snapmintUrl =
    "https://snapmint.com/c/refurbished-laptops-on-emi?category_master_slugs=refurbished-laptops-on-emi&srsltid=AU7gw4VMzXDKYWo49sVHX95pBm92tyZY6uktRf_Ju2WzY52CgjVr-k4w&min_emi_tenure=6";

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-8 sm:p-10 rounded-[32px] bg-forest-900 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              Easy Monthly Installments (6+ Months Tenure)
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Buy Refurbished Laptops on Easy EMI
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Own a first-class Dell Latitude or HP EliteBook today and pay in budget-friendly monthly installments via Snapmint No-Credit-Card EMI or leading bank cards at our Kandivali West store.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={snapmintUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg"
            >
              <span>Check Snapmint EMI Eligibility</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20want%20to%20buy%20a%20refurbished%20laptop%20on%20EMI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enquire EMI on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <CatalogueBrowser
        badge="EMI AVAILABLE ON ALL MODELS"
        title="Shop EMI-Eligible Refurbished Laptops"
        subtitle="Select any laptop below and contact us or visit our Kandivali store to activate your 6-month+ EMI plan."
      />
    </div>
  );
}
