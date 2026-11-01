import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Mail,
  Store,
  CheckCircle2,
  Star,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Visit Viraj Infotech Store in Kandivali West, Mumbai | Directions & Timings",
  description:
    "Visit Viraj Infotech in Kandivali West, Mumbai. Test refurbished laptops, explore branded laptops, chip-level repairs, or get directions and store timings.",
};

export default function VisitStorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-900">
      {/* Top Header */}
      <div className="space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
          KANDIVALI WEST • MUMBAI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          Visit Our Store in <span className="text-brand-600">Kandivali West</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-900 font-medium max-w-3xl leading-relaxed">
          Experience our tested refurbished laptops hands-on, enquire about new laptop and printer brands, or get assistance with laptop repairs at our local store.
        </p>
      </div>

      {/* Hero Banner / Details Card */}
      <div className="rounded-[32px] bg-white border border-cream-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Genuine Storefront Photo */}
        <div className="lg:col-span-5 relative min-h-[380px] bg-forest-900">
          <Image
            src="/store/storefront.webp"
            alt="Viraj IT Storefront with visible signboard in Kandivali West"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black uppercase tracking-wider inline-block">
              Verified Physical Store
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Viraj Infotech</h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              Shantilal Modi Road, Near Bata Showroom, Kandivali West
            </p>
          </div>
        </div>

        {/* Store Information Grid */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Corrected Address per instructions: removed 'Shanti lal,' */}
            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Store Address</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>Store Timings</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                <strong>Mon – Sat:</strong> 10:00 AM – 8:30 PM
                <br />
                <strong>Sunday:</strong> 11:00 AM – 6:00 PM
              </p>
              <span className="text-[11px] text-emerald-700 font-bold block pt-1">
                ● Open Today for Walk-ins
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>Call Store</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-bold">
                <a href="tel:+918928715729" className="hover:text-brand-600">
                  +91 89287 15729
                </a>
              </p>
              <p className="text-xs text-slate-700 font-medium">Direct customer line</p>
            </div>

            <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp Assistance</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 font-bold">
                <a
                  href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20want%20to%20visit%20your%20Kandivali%20West%20store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600"
                >
                  Message Store ↗
                </a>
              </p>
              <p className="text-xs text-slate-700 font-medium">Quick stock &amp; location confirmation</p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <a
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions ↗</span>
            </a>

            <a
              href="tel:+918928715729"
              className="py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 89287 15729</span>
            </a>

            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20want%20to%20visit%20your%20Kandivali%20West%20store"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Inside Our Store Gallery Section */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            02 / INSIDE OUR STORE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
            Take a Look Before You Visit
          </h2>
          <p className="text-sm sm:text-base text-slate-800 font-medium max-w-2xl mt-1">
            See our Kandivali West retail showroom, explore our laptop showcase, and know what to expect when you arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-cream-300 shadow-lg group">
            <Image
              src="/store/storefront.webp"
              alt="Viraj IT storefront with visible signboard on Shantilal Modi Road"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-black uppercase tracking-wider text-pink-300 block">
                01 / Storefront &amp; Signboard
              </span>
              <strong className="text-lg sm:text-xl font-black">
                Visible Signage on Shantilal Modi Road
              </strong>
            </div>
          </div>

          <div className="md:col-span-5 relative h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-cream-300 shadow-lg group">
            <Image
              src="/store/store-inside.png"
              alt="Inside Viraj IT store - Dell and HP laptop display shelves"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-black uppercase tracking-wider text-pink-300 block">
                02 / Laptop Display &amp; Demo Counter
              </span>
              <strong className="text-lg sm:text-xl font-black">
                Genuine Dell &amp; HP Display Shelves
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <div className="rounded-[32px] bg-white border border-cream-300 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
              FIND US ON GOOGLE MAPS
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
              VirajIT Mumbai | Laptop Repair &amp; Refurbished Store
            </h3>
            <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1">
              Near Bata Showroom, Shantilal Modi Road, Kandivali West, Mumbai 400067
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-600 text-white font-black text-xs sm:text-sm shadow hover:bg-brand-500 transition-colors self-start sm:self-auto"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps ↗</span>
          </a>
        </div>

        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-cream-300 shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8641568220833!2d72.84362103670237!3d19.201134708472352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7625f004dc9%3A0xb8ceba952c49cbad!2sVirajIT%20Mumbai%20%7C%20Laptop%20Repair%20and%20Refurbished%20Laptop%20Store!5e0!3m2!1sen!2sin!4v1792837979716!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Viraj IT Store on Google Maps"
          />
        </div>
      </div>

      {/* Verified Customer Reviews Section (from instructions) */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            VERIFIED GOOGLE REVIEWS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight mt-1">
            Real Customer Experiences
          </h2>
          <p className="text-sm sm:text-base text-slate-800 font-medium max-w-2xl mt-1">
            Read what verified clients and institutions say after visiting Viraj Infotech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Review 1: Keshav Lad per docx */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 relative">
                <Image
                  src="/reviews/keshav.png"
                  alt="Keshav Lad"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <strong className="text-base sm:text-lg text-slate-950 block">Keshav Lad</strong>
                <span className="text-xs text-slate-600 font-medium">
                  2 reviews • 0 photos • 3 hours ago{" "}
                  <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-black text-[10px] ml-1">
                    NEW
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              “We bought all hardware from viraj infotech for our school kes international they keep all product ready and service is very fast. Highly recommended for all accessories like adapter, mouse keyboard etc”
            </p>
          </div>

          {/* Review 2: Karan K per docx */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cream-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 relative">
                <Image
                  src="/reviews/karan.png"
                  alt="Karan K"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <strong className="text-base sm:text-lg text-slate-950 block">Karan K</strong>
                <span className="text-xs text-slate-600 font-medium">
                  1 review • 0 photos • 4 weeks ago{" "}
                  <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-black text-[10px] ml-1">
                    NEW
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
              “Very healpful and Polite. Prices are very reasonable. Highly recommended for customer satisfaction and after sales service.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
