"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStockLock } from "@/context/LockContext";
import {
  Lock,
  Heart,
  Layers,
  Menu,
  X,
  Wrench,
  Laptop,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { activeLocks, openCheckout, formatTime } = useStockLock();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasActiveLocks = activeLocks.length > 0;
  const primaryLock = activeLocks[0];

  const navLinks = [
    { label: "Laptops", href: "/refurbished-laptops-catalogue" },
    { label: "Laptop Repair", href: "/laptop-repair-store-in-mumbai" },
    { label: "Laptop on Rent", href: "/laptop-on-rent-mumbai" },
    { label: "Visit Store", href: "/virajit-laptop-store-kandivali-west" },
  ];

  const marqueeItems = [
    "Refurbished Laptop Store in Mumbai",
    "Laptop Repair Store in Kandivali",
    "Warranty Included on Every Laptop",
    "Delivery Across Mumbai • Free Accessories Included",
    "Starting from ₹21,990 • Laptop on Loan Available",
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Moving Banner (Marquee Strip from Project Brief) */}
      <div className="bg-forest-900 text-white overflow-hidden py-2 border-b border-forest-800 text-xs font-bold tracking-wide">
        <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <Link
              key={idx}
              href={
                item.includes("Repair")
                  ? "/laptop-repair-store-in-mumbai"
                  : "/refurbished-laptops-catalogue"
              }
              className="inline-flex items-center gap-2.5 hover:text-lime-400 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />
              <span>{item}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Header Navigation (Matching Nav Menu_Sitemap_VirajIT_Website.xlsx) */}
      <div className="backdrop-blur-md bg-cream-50/95 border-b border-cream-300/80 text-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* LOGO - Viraj Infotech */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-cream-300 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="Viraj Infotech"
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-black text-xl tracking-tight text-slate-900">
                  Viraj
                </span>
                <span className="font-black text-xl tracking-tight text-brand-600">
                  Infotech
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 -mt-1">
                Kandivali West • Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links: LOGO | Laptops | Laptop Repair | Laptop on Rent | Visit Store */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 border-b-2 ${
                    isActive
                      ? "text-brand-600 border-brand-600 font-black"
                      : "border-transparent hover:text-brand-600"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-slate-800 text-xs font-bold transition-all border border-cream-300"
            >
              <Layers className="w-3.5 h-3.5 text-brand-600" />
              Admin
            </Link>
          </nav>

          {/* Right Actions: Call Store / Shortlist / Active Lock */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:+919876543210"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-extrabold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store</span>
            </a>

            {hasActiveLocks && primaryLock ? (
              <button
                onClick={() => primaryLock.product && openCheckout(primaryLock.product)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/50 text-amber-900 hover:bg-amber-500/25 transition-all text-xs font-bold animate-pulse shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  Reserved:{" "}
                  <strong className="text-amber-800 font-mono">
                    {formatTime(primaryLock.secondsRemaining)}
                  </strong>
                </span>
              </button>
            ) : (
              <Link
                href="/refurbished-laptops-catalogue"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-black shadow-sm transition-all"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Shop Catalogue</span>
                <span className="sm:hidden">Shop</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white border border-cream-300 text-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-cream-300 px-4 py-4 space-y-2 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-cream-100 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-cream-200 flex items-center justify-between px-4">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-600 flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-brand-600" />
                Admin Studio
              </Link>
              <a
                href="tel:+919876543210"
                className="text-xs font-black text-brand-600 flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> +91 98765 43210
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
