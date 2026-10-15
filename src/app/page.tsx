"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, BlogPost } from "@/types";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { useStockLock } from "@/context/LockContext";
import {
  Laptop,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Award,
  MessageCircle,
  Truck,
  Wrench,
  Gift,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Store,
  Users,
  IndianRupee,
} from "lucide-react";

const GOOGLE_REVIEWS = [
  {
    name: "Sumit Saxena",
    time: "1 year ago",
    initial: "S",
    bg: "bg-emerald-700",
    text: "Myself Sumit and working in Bluedart purchased the laptop for my work and it is working flawless so happy with Viraj Infotech Kandivali store service and guidance.",
  },
  {
    name: "Areeba Asim",
    time: "1 year ago",
    initial: "A",
    bg: "bg-indigo-600",
    text: "I had a great experience with Viraj Infotech. The laptop performs smoothly, has excellent battery life, and the team helped me pick the best Dell Latitude within my budget.",
  },
  {
    name: "YAHYA",
    time: "1 year ago",
    initial: "Y",
    bg: "bg-slate-800",
    text: "I have purchased many laptops (for me as well as for my friends) from VirajIT and they are always good and reliable. Best refurbished laptop store in Mumbai!",
  },
  {
    name: "Rohan Kulkarni",
    time: "6 months ago",
    initial: "R",
    bg: "bg-amber-600",
    text: "Bought a Dell Latitude 7420 Touch Screen from their Kandivali West store. Condition is literally like brand new and saved almost 45% compared to new price.",
  },
  {
    name: "Priya Nair",
    time: "3 months ago",
    initial: "P",
    bg: "bg-rose-600",
    text: "Very transparent pricing, genuine warranty included, and they also gave free bag and wireless mouse. Highly recommend visiting their Kandivali store.",
  },
];

const CUSTOMER_GALLERY = [
  {
    title: "Dell Latitude 7420 Handover",
    caption: "Happy customer at our Kandivali West store with free accessories",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Student Laptop Upgrade",
    caption: "Dell Latitude 7480 picked up for college & coding under ₹25,000",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Corporate Startup Batch",
    caption: "HP EliteBook series delivered across Mumbai for an expanding team",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "In-Store Live Testing",
    caption: "Every customer gets a complete 40-point live demo before billing",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
];

const VIDEOS_AND_SHORTS = [
  {
    title: "Why Refurbished Business Laptops Beat New Budget Laptops",
    duration: "0:58",
    tag: "YouTube Short",
    thumbnail:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Inside Viraj Infotech Kandivali Store • Stock Tour",
    duration: "1:45",
    tag: "Store Tour",
    thumbnail:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dell Latitude 7420 i7 Touch Screen Review & Price Reveal",
    duration: "0:49",
    tag: "YouTube Short",
    thumbnail:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HomePage() {
  const { sessionToken } = useStockLock();

  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  const loadProducts = async () => {
    try {
      const url = sessionToken
        ? `/api/products?sessionToken=${encodeURIComponent(sessionToken)}`
        : "/api/products";
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error("Error loading blogs:", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadBlogs();

    const interval = setInterval(() => {
      loadProducts();
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionToken]);

  // Price Range Filtering for Popular Section
  const priceRangeProducts = products.filter((p) => {
    if (selectedPriceRange === "UNDER_25K") return p.price <= 25000;
    if (selectedPriceRange === "25K_40K") return p.price > 25000 && p.price <= 40000;
    if (selectedPriceRange === "ABOVE_40K") return p.price > 40000;
    return true;
  });

  // Popular Refurbished Laptops: Total 2 rows, Three laptops for each row (6 laptops total)
  const sortedForPopular = [...priceRangeProducts].sort(
    (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
  );
  const popularLaptops = sortedForPopular.slice(0, 6);

  // Premium Refurbished Laptops: Between 2 to 4 laptops (50k plus or premium in terms of configuration)
  const premiumLaptops = products
    .filter((p) => p.isPremium || p.price >= 37000 || p.touchScreen === "Yes")
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);

  const visibleReviews = [
    GOOGLE_REVIEWS[reviewStartIndex % GOOGLE_REVIEWS.length],
    GOOGLE_REVIEWS[(reviewStartIndex + 1) % GOOGLE_REVIEWS.length],
    GOOGLE_REVIEWS[(reviewStartIndex + 2) % GOOGLE_REVIEWS.length],
  ];

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION (Updated per Project Brief_VirajIT_Website.docx) */}
      <section className="relative overflow-hidden pt-8 pb-14 px-4 sm:px-6 lg:px-8 bg-cream-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Hero Content */}
          <div className="max-w-2xl space-y-6 text-left">
            {/* Replaced MUMBAI'S TRUSTED LAPTOP STORE with MUMBAI’S TRUSTED REFURBISHED LAPTOP STORE */}
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-600 block">
              MUMBAI’S TRUSTED REFURBISHED LAPTOP STORE
            </span>

            {/* Replaced Premium laptops. Smarter prices. with Laptop First-Class. Price Budget-Wala. */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.06]">
              Laptop First-Class. <br />
              <span className="text-brand-600">Price Budget-Wala.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Professionally tested corporate refurbished laptops for work, study and business — backed by real warranty, free accessories, and our Kandivali West store support.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/refurbished-laptops-catalogue"
                className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm shadow-md transition-all flex items-center gap-2 transform hover:scale-[1.02]"
              >
                <span>Browse Refurbished Laptops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919876543210?text=Hi%20Viraj%20Infotech,%20I'm%20looking%20for%20a%20refurbished%20laptop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-cream-50 text-slate-900 border border-slate-300 text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-cream-300/80">
              <div>
                <div className="text-2xl font-black text-slate-900">20+ Yrs</div>
                <div className="text-xs text-slate-500 font-medium">Two decades of legacy</div>
              </div>
              <div className="h-8 w-px bg-cream-300" />
              <div>
                <div className="text-2xl font-black text-slate-900">Up to 50%</div>
                <div className="text-xs text-slate-500 font-medium">Savings on MRP</div>
              </div>
              <div className="h-8 w-px bg-cream-300" />
              <div>
                <div className="text-2xl font-black text-slate-900 flex items-center gap-0.5">
                  4.9<span className="text-amber-500 text-lg">★</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">Google Verified Rating</div>
              </div>
            </div>
          </div>

          {/* Right Hero Laptop Graphic with Orbs & Floating Badges */}
          <div className="relative w-full max-w-lg flex items-center justify-center py-6">
            {/* Soft Green Orb Background */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-emerald-200/70 blur-2xl absolute -z-0" />
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-emerald-300 to-lime-200 absolute -z-0" />

            {/* Laptop Mockup Box: Replaced VI with Viraj Infotech & Removed Built for what's next. */}
            <div className="relative z-10 w-full max-w-[420px] rounded-2xl bg-forest-900 border-8 border-slate-800 shadow-2xl p-10 text-center space-y-3">
              <div className="px-6 py-4 rounded-2xl bg-forest-800 border border-forest-800 inline-flex items-center justify-center mx-auto text-lime-400 font-black text-2xl sm:text-3xl tracking-wide shadow-inner">
                Viraj Infotech
              </div>
            </div>

            {/* Floating Top-Right Card: Starting from ₹21,990 */}
            <div className="absolute -top-2 right-2 z-20 px-4 py-2.5 rounded-xl bg-white shadow-xl border border-cream-200 text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Starting from
              </div>
              <div className="text-lg font-black text-slate-900 font-sans">₹21,990</div>
            </div>

            {/* Floating Bottom-Left Card: Warranty Included on every laptop */}
            <div className="absolute -bottom-4 left-2 z-20 px-4 py-3 rounded-xl bg-white shadow-xl border border-cream-200 text-left space-y-0.5">
              <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Warranty Included</span>
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">
                On every laptop
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP (Delivery across Mumbai | Laptop on Loan | Skilled Technicians | Free Accessories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-forest-900 text-white shadow-xl border border-forest-800">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Delivery across Mumbai</h3>
              <p className="text-xs text-slate-300">Fast &amp; safe doorstep delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Laptop on Loan</h3>
              <p className="text-xs text-slate-300">Backup laptop during service</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Skilled Technicians</h3>
              <p className="text-xs text-slate-300">Expert chip-level QA &amp; support</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 border border-white/10 flex items-center justify-center text-lime-400 shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">Free Accessories</h3>
              <p className="text-xs text-slate-300">Complimentary bag &amp; mouse</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY PRICE RANGE (Under Rs.25,000 | Rs.25,000 - Rs.40,000 | Above Rs.40,000) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
              FIND BY BUDGET
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Shop By Price Range
            </h2>
          </div>
          {selectedPriceRange !== "ALL" && (
            <button
              onClick={() => setSelectedPriceRange("ALL")}
              className="text-xs font-black text-brand-600 hover:underline"
            >
              Show All Price Ranges ✕
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Under Rs.25,000 */}
          <div
            onClick={() =>
              setSelectedPriceRange(selectedPriceRange === "UNDER_25K" ? "ALL" : "UNDER_25K")
            }
            className={`cursor-pointer group p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
              selectedPriceRange === "UNDER_25K"
                ? "bg-brand-600 text-white border-brand-600 shadow-xl"
                : "bg-white hover:bg-cream-50 text-slate-900 border-cream-300 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedPriceRange === "UNDER_25K"
                    ? "bg-white/20 text-white"
                    : "bg-brand-50 text-brand-700 border border-brand-200"
                }`}
              >
                Student &amp; Office Savers
              </span>
              <IndianRupee
                className={`w-5 h-5 ${
                  selectedPriceRange === "UNDER_25K" ? "text-lime-300" : "text-brand-600"
                }`}
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Under Rs.25,000</h3>
              <p
                className={`text-xs mt-1 ${
                  selectedPriceRange === "UNDER_25K" ? "text-cream-100" : "text-slate-500"
                }`}
              >
                Dell Latitude i5 6th Gen, 8GB RAM, 256GB SSD starting at ₹22,299
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs font-extrabold">
              <Link
                href="/refurbished-laptops-under-rs-20000"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline flex items-center gap-1"
              >
                <span>Explore Under ₹25k</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span>Filter Below</span>
            </div>
          </div>

          {/* Rs.25,000 - Rs.40,000 (Rs.25k - Rs.40k) */}
          <div
            onClick={() =>
              setSelectedPriceRange(selectedPriceRange === "25K_40K" ? "ALL" : "25K_40K")
            }
            className={`cursor-pointer group p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
              selectedPriceRange === "25K_40K"
                ? "bg-brand-600 text-white border-brand-600 shadow-xl"
                : "bg-white hover:bg-cream-50 text-slate-900 border-cream-300 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedPriceRange === "25K_40K"
                    ? "bg-white/20 text-white"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                Most Popular Bracket
              </span>
              <IndianRupee
                className={`w-5 h-5 ${
                  selectedPriceRange === "25K_40K" ? "text-lime-300" : "text-brand-600"
                }`}
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Rs.25,000 - Rs.40,000
              </h3>
              <p
                className={`text-xs mt-1 ${
                  selectedPriceRange === "25K_40K" ? "text-cream-100" : "text-slate-500"
                }`}
              >
                Rs.25k - Rs.40k • 8th–11th Gen i5, HP EliteBook &amp; Dell Touch Models
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs font-extrabold">
              <Link
                href="/refurbished-laptops-under-rs-30000"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline flex items-center gap-1"
              >
                <span>Explore ₹25k – ₹40k</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span>Filter Below</span>
            </div>
          </div>

          {/* Above Rs.40,000 */}
          <div
            onClick={() =>
              setSelectedPriceRange(selectedPriceRange === "ABOVE_40K" ? "ALL" : "ABOVE_40K")
            }
            className={`cursor-pointer group p-6 rounded-3xl border transition-all flex flex-col justify-between gap-4 ${
              selectedPriceRange === "ABOVE_40K"
                ? "bg-brand-600 text-white border-brand-600 shadow-xl"
                : "bg-white hover:bg-cream-50 text-slate-900 border-cream-300 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  selectedPriceRange === "ABOVE_40K"
                    ? "bg-white/20 text-white"
                    : "bg-purple-50 text-purple-800 border border-purple-200"
                }`}
              >
                Power &amp; Touch Screen
              </span>
              <IndianRupee
                className={`w-5 h-5 ${
                  selectedPriceRange === "ABOVE_40K" ? "text-lime-300" : "text-brand-600"
                }`}
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Above Rs.40,000</h3>
              <p
                className={`text-xs mt-1 ${
                  selectedPriceRange === "ABOVE_40K" ? "text-cream-100" : "text-slate-500"
                }`}
              >
                Intel Core i7 11th &amp; 12th Gen, up to 32GB RAM &amp; FHD Touch Displays
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-current/10 text-xs font-extrabold">
              <Link
                href="/refurbished-laptops-under-rs-40000"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline flex items-center gap-1"
              >
                <span>Explore Above ₹40k</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span>Filter Below</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR REFURBISHED LAPTOPS (Total 2 rows. Three laptops for each row + View All Laptop Button) */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cream-300 pb-5">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
              TOP SELLING MODELS IN MUMBAI
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Popular Refurbished Laptops
            </h2>
          </div>

          <Link
            href="/refurbished-laptops-catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-black shadow-sm transition-all self-start sm:self-auto"
          >
            <span>View All Laptops ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="p-16 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-600 mb-2" />
            <p className="text-sm font-medium">Loading popular refurbished laptops...</p>
          </div>
        ) : (
          <>
            {/* 2 Rows x 3 Laptops Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularLaptops.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(p) => setSelectedProductForModal(p)}
                />
              ))}
            </div>

            {/* Bottom View All Laptops Button */}
            <div className="text-center pt-4">
              <Link
                href="/refurbished-laptops-catalogue"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-brand-600 text-white font-black text-sm shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <Laptop className="w-4 h-4" />
                <span>View All Refurbished Laptops Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 5. PREMIUM REFURBISHED LAPTOPS (Between 2 to 4 laptops • 50k plus or premium in configuration) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-cream-200 via-cream-100 to-emerald-50 border border-cream-300 space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cream-300 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 text-lime-400 text-[11px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                High-Spec Touch Screen &amp; Core i7 Series
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Premium Refurbished Laptops
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Flagship corporate ultrabooks with 11th &amp; 12th Gen processors, up to 32GB RAM, and Full HD Touch Screen displays.
              </p>
            </div>

            <Link
              href="/refurbished-laptops-catalogue?tier=premium"
              className="text-xs font-black text-brand-700 hover:text-brand-900 flex items-center gap-1 shrink-0"
            >
              <span>Explore All Premium Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumLaptops.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(p) => setSelectedProductForModal(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY VIRAJIT (Local Store | Two Decades of legacy | Rated 4.9 on Google | Authorised Partner MSI, DELL, EPSON, ACER) */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-[32px] bg-forest-900 text-white shadow-2xl space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-lime-400 block">
              THE VIRAJ INFOTECH ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Why Choose VirajIT?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Unlike anonymous online portals, Viraj Infotech is a real brick-and-mortar store in Mumbai with over 20 years of customer trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Local Store */}
            <div className="p-6 rounded-2xl bg-forest-800/90 border border-white/10 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-lime-400/15 text-lime-400 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Local Store in Mumbai</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Walk into our Kandivali West store, inspect and test the exact laptop in person, and get instant face-to-face support whenever you need it.
              </p>
            </div>

            {/* Pillar 2: Two Decades of Legacy */}
            <div className="p-6 rounded-2xl bg-forest-800/90 border border-white/10 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-lime-400/15 text-lime-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Two Decades of Legacy</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Serving Mumbai since over 20 years with honest advice, corporate-grade refurbished laptops, and expert chip-level repairs.
              </p>
            </div>

            {/* Pillar 3: Rated 4.9 on Google */}
            <div className="p-6 rounded-2xl bg-forest-800/90 border border-white/10 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-lime-400/15 text-amber-400 flex items-center justify-center">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <h3 className="text-lg font-black text-white">
                Rated 4.9★ on Google
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rated 4.9 on Google by hundreds of verified users across Mumbai for laptop quality, transparent pricing, and after-sales care.
              </p>
            </div>

            {/* Pillar 4: Authorised Partner */}
            <div className="p-6 rounded-2xl bg-forest-800/90 border border-white/10 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-lime-400/15 text-lime-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">
                Authorised Brand Partner
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorised Partner and Distributors of leading global brands including{" "}
                <strong className="text-lime-400">MSI, DELL, EPSON, and ACER</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HAPPY CUSTOMERS (Google Reviews matching screenshot + Photo Gallery + Videos & Shorts) */}
      <section id="happy-customers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 7A. Google Reviews Widget (Matching Reference Screenshot in Project Brief) */}
        <div className="bg-white rounded-[32px] border border-cream-300 p-6 sm:p-10 shadow-sm space-y-8">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hear It From Our Happy Customers
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Google Rating Summary Column */}
            <div className="lg:col-span-3 text-center space-y-2 py-4">
              <div className="text-xl font-black tracking-wide text-slate-900 uppercase">
                EXCELLENT
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-400 text-2xl">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div className="text-xs text-slate-700 font-medium">
                Based on <strong className="font-black text-slate-900">259 reviews</strong>
              </div>
              {/* Google Wordmark */}
              <div className="pt-1 text-2xl font-black tracking-tight select-none">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
            </div>

            {/* Right 3 Review Cards with Carousel Arrows */}
            <div className="lg:col-span-9 relative flex items-center">
              <button
                onClick={() =>
                  setReviewStartIndex(
                    (prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length
                  )
                }
                aria-label="Previous reviews"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-900 shrink-0 -mr-3 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-2">
                {visibleReviews.map((rev, idx) => {
                  const isExpanded = !!expandedReviews[idx];
                  return (
                    <div
                      key={`${rev.name}-${idx}`}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2.5">
                        {/* Reviewer Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-10 h-10 rounded-full ${rev.bg} text-white font-bold text-sm flex items-center justify-center shrink-0`}
                            >
                              {rev.initial}
                            </div>
                            <div>
                              <div className="text-sm font-extrabold text-slate-900 leading-tight">
                                {rev.name}
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium">
                                {rev.time}
                              </div>
                            </div>
                          </div>
                          {/* Google 'G' Icon */}
                          <span className="text-lg font-black text-[#4285F4]">G</span>
                        </div>

                        {/* 5 Stars + Blue Verified Badge */}
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400 text-sm">★★★★★</div>
                          <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                        </div>

                        {/* Review Text */}
                        <p
                          className={`text-xs text-slate-700 leading-relaxed ${
                            isExpanded ? "" : "line-clamp-4"
                          }`}
                        >
                          {rev.text}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedReviews((prev) => ({ ...prev, [idx]: !prev[idx] }))
                        }
                        className="text-xs text-slate-400 hover:text-slate-700 font-semibold text-left pt-1"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setReviewStartIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length)
                }
                aria-label="Next reviews"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-900 shrink-0 -ml-3 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 7B. Photo Gallery of Customers & Videos and Shorts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer Photo Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
                COMMUNITY &amp; STORE HANDOVERS
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Photo Gallery of Happy Customers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CUSTOMER_GALLERY.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative h-52 rounded-2xl overflow-hidden border border-cream-300 bg-slate-900 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-sm font-black">{item.title}</div>
                    <div className="text-[11px] text-slate-300 line-clamp-1">{item.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos and Shorts (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
                WATCH IN ACTION
              </span>
              <h3 className="text-2xl font-black text-slate-900">Videos &amp; Shorts</h3>
            </div>

            <div className="space-y-3">
              {VIDEOS_AND_SHORTS.map((vid, idx) => (
                <a
                  key={idx}
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-2xl bg-white border border-cream-300 hover:border-brand-600 shadow-sm transition-all"
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[10px] font-black uppercase">
                      {vid.tag} • {vid.duration}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-brand-600 line-clamp-2">
                      {vid.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. VISIT THE STORE (Kandivali West location | Store photograph | Opening hours | Call | WhatsApp | Get Directions) */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="rounded-[32px] bg-white border border-cream-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Store Photograph */}
          <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] bg-forest-900">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Viraj Infotech Kandivali West Store"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Experience In-Store
              </span>
              <h3 className="text-xl font-black pt-1">Viraj Infotech • Kandivali West</h3>
              <p className="text-xs text-slate-300">
                Try any laptop hands-on before you buy with our expert technicians.
              </p>
            </div>
          </div>

          {/* Right Location Details, Opening Hours & 3 Action Buttons */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
                  WALK IN &amp; TEST IN PERSON
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Visit The Store
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Kandivali West Location */}
                <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div className="font-black text-slate-900 uppercase tracking-wider">
                      Kandivali West Location
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Viraj Infotech, Shop No. 4, Near Kandivali Railway Station, S.V. Road, Kandivali West, Mumbai – 400067
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <div className="font-black text-slate-900 uppercase tracking-wider">
                      Opening Hours
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      <strong>Mon – Sat:</strong> 10:00 AM – 8:30 PM
                      <br />
                      <strong>Sunday:</strong> 11:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call Button | WhatsApp Button | Get Directions Button */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href="tel:+919876543210"
                className="py-3.5 px-5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store</span>
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Viraj%20Infotech,%20I%20would%20like%20to%20visit%20your%20Kandivali%20West%20store"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Viraj+Infotech+Kandivali+West+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  );
}
