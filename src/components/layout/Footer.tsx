import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Youtube,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  ExternalLink,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-gradient-to-br from-forest-950 via-slate-950 to-slate-950 text-slate-300 text-sm pt-16 pb-12 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 4-Column Footer Layout matching Nav Menu_Sitemap_VirajIT_Website.xlsx */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1: About VirajIT (Text, Address, Social Media Icons, YT | G Reviews) */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-40 h-12 rounded-xl bg-white px-2 py-1 flex items-center justify-center shrink-0 shadow-md">
                  <Image
                    src="/viraj-infotech-logo.jpeg"
                    alt="Viraj Infotech"
                    width={320}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed">
                Mumbai&apos;s trusted refurbished laptop &amp; chip-level repair store with over two decades of legacy. Authorised partner &amp; distributor for leading brands including MSI, Dell, Epson, and Acer.
              </p>

              <a
                href="https://share.google/SCAKjT9NThGEm3CPB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-xs text-slate-300 hover:text-pink-300 pt-1 transition-colors group"
              >
                <MapPin className="w-4 h-4 text-pink-300 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>
                  Viraj Infotech, Shop No. 4, Near Railway Station, S.V. Road, Kandivali West, Mumbai - 400067 ↗
                </span>
              </a>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full border border-slate-700 hover:border-pink-300 hover:text-pink-300 flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full border border-slate-700 hover:border-pink-300 hover:text-pink-300 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full border border-slate-700 hover:border-pink-300 hover:text-pink-300 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full border border-slate-700 hover:border-pink-300 hover:text-pink-300 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              {/* YT | G Reviews Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-500/50 text-xs font-bold text-white transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>YouTube Channel</span>
                </a>
                <a
                  href="#happy-customers"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400/50 text-xs font-bold text-white transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9★ Google Reviews</span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-xs font-medium text-slate-400">
                <li>
                  <Link
                    href="/refurbished-laptops-catalogue"
                    className="hover:text-pink-300 transition-colors"
                  >
                    Refurbished Laptops
                  </Link>
                </li>
                <li>
                  <Link
                    href="/laptop-on-rent-mumbai"
                    className="hover:text-pink-300 transition-colors"
                  >
                    Laptop on Rent
                  </Link>
                </li>
                <li>
                  <Link
                    href="/laptop-repair-store-in-mumbai#amc"
                    className="hover:text-pink-300 transition-colors"
                  >
                    Laptop AMC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/laptop-repair-store-in-mumbai"
                    className="hover:text-pink-300 transition-colors"
                  >
                    Laptop Repair
                  </Link>
                </li>
                <li>
                  <Link
                    href="/virajit-laptop-store-kandivali-west"
                    className="hover:text-pink-300 transition-colors"
                  >
                    Visit Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refurbished-laptops-on-emi"
                    className="hover:text-pink-300 transition-colors flex items-center gap-1 text-pink-300 font-bold"
                  >
                    <span>Laptops on Easy EMI</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Support (For Sales & For Support) */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Support
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-pink-300">
                    For Sales:
                  </div>
                  <a
                    href="tel:+918928715729"
                    className="flex items-center gap-2 text-white font-bold hover:text-pink-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Phone: +91 89287 15729</span>
                  </a>
                  <a
                    href="mailto:sales@virajit.com"
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email: sales@virajit.com</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                    For Support &amp; Repair:
                  </div>
                  <a
                    href="tel:+919876543211"
                    className="flex items-center gap-2 text-white font-bold hover:text-amber-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Phone: +91 98765 43211</span>
                  </a>
                  <a
                    href="mailto:support@virajit.com"
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email: support@virajit.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Company & Other Sitemap Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Company
              </h3>
              <ul className="space-y-2 text-xs font-medium text-slate-400">
                <li>
                  <Link href="/about-us" className="hover:text-pink-300 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-pink-300 transition-colors">
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-pink-300 transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-pink-300 transition-colors">
                    Laptop Buying Guides
                  </Link>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Shop By Budget &amp; Area
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <Link
                    href="/refurbished-laptops-kandivali"
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-pink-300/50 text-slate-300"
                  >
                    Kandivali
                  </Link>
                  <Link
                    href="/refurbished-laptops-under-rs-20000"
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-pink-300/50 text-slate-300"
                  >
                    Under Rs.25,000
                  </Link>
                  <Link
                    href="/refurbished-laptops-under-rs-30000"
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-pink-300/50 text-slate-300"
                  >
                    Under Rs.35,000
                  </Link>
                  <Link
                    href="/refurbished-laptops-under-rs-40000"
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-pink-300/50 text-slate-300"
                  >
                    Under Rs.45,000
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Viraj Infotech (virajit.com). All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/virajit-laptop-store-kandivali-west" className="hover:text-slate-300">
                Kandivali West, Mumbai
              </Link>
              <span>•</span>
              <Link href="/admin" className="hover:text-slate-300">
                Admin Studio
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Pill on Bottom Right */}
      <a
        href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I'm%20interested%20in%20a%20refurbished%20laptop"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-2xl shadow-emerald-600/40 hover:scale-105 transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp Us</span>
      </a>
    </>
  );
};
