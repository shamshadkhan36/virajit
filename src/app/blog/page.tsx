"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { BookOpen, Search, ArrowRight, Layers, Sparkles } from "lucide-react";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs || []);
      })
      .catch((err) => console.error("Error loading blogs:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = ["All", "Buying Guides", "Hardware Reviews", "Refurbishing Tech", "Battery Diagnostics"];

  const filtered = blogs.filter((b) => {
    if (selectedCategory !== "All" && b.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
          VIRAJ INFOTECH EDITORIAL & GUIDES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Laptop Reviews, Teardowns & Buying Advice
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal">
          Explore our expert guides constructed with our visual Page Builder. Learn how to inspect condition grades, test battery cycle wear, and get the most value for your budget.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="p-5 rounded-3xl bg-white border border-cream-300 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, laptops, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-cream-50 border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-cream-100 text-slate-600 hover:text-slate-900 border border-cream-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-500">Loading articles...</div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-3xl border border-cream-300">
          No articles found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => {
            let blockCount = 0;
            try {
              blockCount = JSON.parse(post.blocks).length;
            } catch {
              blockCount = 0;
            }

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl border border-cream-300 hover:border-brand-600 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 w-full bg-cream-200">
                  <Image
                    src={post.coverImage || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-black text-brand-700 shadow-sm">
                      {post.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-brand-50 text-[10px] font-bold text-brand-700 border border-brand-200 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {blockCount} Blocks
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between text-xs text-slate-500">
                    <span className="truncate">{post.author}</span>
                    <div className="flex items-center gap-1 font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
