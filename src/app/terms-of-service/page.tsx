import React from "react";

export const metadata = {
  title: "Terms of Service | Viraj Infotech",
  description: "Terms of Service, warranty policy, and conditions for Viraj Infotech.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Terms of Service</h1>
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">1. Refurbished Hardware Grading &amp; Inspection</h2>
          <p>
            Every refurbished laptop sold by Viraj Infotech undergoes a 40+ point hardware inspection covering processor, RAM, SSD storage, display, ports, keyboard, trackpad, and battery performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">2. Warranty Coverage</h2>
          <p>
            All refurbished laptops include our store hardware warranty (1 Month to 36 Months as specified on the product invoice). Physical damage, liquid spills, or unauthorized third-party tampering are not covered under warranty.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">3. Stock Hold &amp; Pricing</h2>
          <p>
            Prices listed on virajit.com are in Indian Rupees (₹). Online 10-minute unit locks reserve the specified configuration while you complete checkout or confirm via our Kandivali West store.
          </p>
        </section>
      </div>
    </div>
  );
}
