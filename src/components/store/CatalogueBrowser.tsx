"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductModal } from "@/components/store/ProductModal";
import { useStockLock } from "@/context/LockContext";
import { Search, Laptop, RefreshCw } from "lucide-react";

interface CatalogueBrowserProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  initialMaxPrice?: number;
  initialMinPrice?: number;
  initialOnlyTouch?: boolean;
}

export const CatalogueBrowser: React.FC<CatalogueBrowserProps> = ({
  title = "Refurbished Laptops Catalogue",
  subtitle = "Every laptop is tested across 40+ checkpoints, includes warranty & free accessories, and is available at our Kandivali West store or via Mumbai delivery.",
  badge = "CERTIFIED REFURBISHED INVENTORY",
  initialMaxPrice,
  initialMinPrice,
  initialOnlyTouch = false,
}) => {
  const { sessionToken } = useStockLock();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [priceBracket, setPriceBracket] = useState<string>(
    initialMaxPrice === 25000
      ? "UNDER_25K"
      : initialMaxPrice === 35000
      ? "UNDER_35K"
      : initialMaxPrice === 45000
      ? "UNDER_45K"
      : initialMinPrice === 40000
      ? "ABOVE_40K"
      : "ALL"
  );
  const [onlyTouchScreen, setOnlyTouchScreen] = useState(initialOnlyTouch);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
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
        console.error("Error loading catalogue:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [sessionToken]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleProcessor = (proc: string) => {
    setSelectedProcessors((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedProcessors([]);
    setPriceBracket("ALL");
    setOnlyTouchScreen(false);
    setOnlyAvailable(false);
    setSearchQuery("");
  };

  const filteredProducts = products
    .filter((p) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (
        selectedProcessors.length > 0 &&
        !selectedProcessors.some((proc) => p.processor.toLowerCase().includes(proc.toLowerCase()))
      ) {
        return false;
      }
      if (priceBracket === "UNDER_25K" && p.price > 25000) return false;
      if (priceBracket === "25K_40K" && (p.price <= 25000 || p.price > 40000)) return false;
      if (priceBracket === "UNDER_35K" && p.price > 35000) return false;
      if (priceBracket === "UNDER_45K" && p.price > 45000) return false;
      if (priceBracket === "ABOVE_40K" && p.price <= 40000) return false;

      if (onlyTouchScreen && p.touchScreen !== "Yes") return false;
      if (onlyAvailable) {
        const available = p.availableStock !== undefined ? p.availableStock : p.stock;
        if (available <= 0 && !p.isLockedByMe) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.processor.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.ram.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  const brandOptions = ["Dell", "HP"];
  const processorOptions = ["Intel Core i3", "Intel Core i5", "Intel Core i7"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-cream-300 pb-6 space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
          {badge}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">{subtitle}</p>
      </div>

      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by brand, model (e.g. Latitude 7480, 840 G7), processor or RAM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-600 shadow-sm"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-56 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-brand-600 shadow-sm cursor-pointer"
        >
          <option value="featured">Featured Top Picks</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* 2-Column Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Sidebar */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <h2 className="font-extrabold text-base text-slate-900">Shortlist Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Price Range
            </h3>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              {[
                { id: "ALL", label: "All Prices" },
                { id: "UNDER_25K", label: "Under Rs.25,000" },
                { id: "25K_40K", label: "Rs.25,000 - Rs.40,000" },
                { id: "ABOVE_40K", label: "Above Rs.40,000" },
                { id: "UNDER_35K", label: "Under Rs.35,000" },
                { id: "UNDER_45K", label: "Under Rs.45,000" },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="priceBracket"
                    checked={priceBracket === opt.id}
                    onChange={() => setPriceBracket(opt.id)}
                    className="text-brand-600 focus:ring-brand-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2.5 pt-4 border-t border-cream-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Brand</h3>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              {brandOptions.map((brand) => (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Processor Filter */}
          <div className="space-y-2.5 pt-4 border-t border-cream-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Processor
            </h3>
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              {processorOptions.map((proc) => (
                <label key={proc} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProcessors.includes(proc)}
                    onChange={() => toggleProcessor(proc)}
                    className="w-4 h-4 rounded border-slate-300 text-brand-600"
                  />
                  <span>{proc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Touch Screen & Stock Toggles */}
          <div className="space-y-3 pt-4 border-t border-cream-200 text-xs font-bold text-slate-800">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyTouchScreen}
                onChange={(e) => setOnlyTouchScreen(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-brand-600"
              />
              <span>Touch Screen Only</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-brand-600"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Right Product Cards Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {filteredProducts.length} refurbished laptops</span>
            <span>Warranty Included • Free Accessories</span>
          </div>

          {isLoading ? (
            <div className="p-16 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-600 mb-2" />
              <p className="text-sm font-medium">Loading catalogue...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-cream-300 space-y-3">
              <Laptop className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No matching laptops found</h3>
              <p className="text-xs text-slate-500">
                Try clearing your filters or searching a different model.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(p) => setSelectedProductForModal(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  );
};
