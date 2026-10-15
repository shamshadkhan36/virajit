import React from "react";

export const metadata = {
  title: "Privacy Policy | Viraj Infotech",
  description: "Privacy policy for Viraj Infotech customers and website visitors.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Privacy Policy</h1>
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">1. Information We Collect</h2>
          <p>
            When you enquire via WhatsApp, phone, or place an order on virajit.com, we collect only the contact and delivery details (Name, Phone Number, Email, and Delivery Address) required to fulfill your laptop purchase or service request.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">2. Data Security &amp; Clean Storage</h2>
          <p>
            All refurbished laptops and storage drives at Viraj Infotech are securely wiped and sanitized prior to sale. Customer contact details are never sold or shared with third-party marketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-black text-slate-900">3. Contact Us</h2>
          <p>
            For any privacy-related queries, contact Viraj Infotech at sales@virajit.com or visit our store in Kandivali West, Mumbai.
          </p>
        </section>
      </div>
    </div>
  );
}
