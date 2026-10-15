"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BlogPost, PageBuilderBlock, Product } from "@/types";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { ProductModal } from "@/components/store/ProductModal";
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Laptop,
} from "lucide-react";

export default function SingleBlogPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [blocks, setBlocks] = useState<PageBuilderBlock[]>([]);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogs/${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.blog) {
          setPost(data.blog);
          try {
            const parsed = JSON.parse(data.blog.blocks);
            setBlocks(parsed);
          } catch (e) {
            setBlocks([]);
          }
        } else {
          setError(data.error || "Blog post not found.");
        }
      })
      .catch((err) => setError(err.message || "Failed to load blog post."))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-slate-500">
        Loading guide & custom page blocks...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-500 text-sm">{error || "The requested blog post does not exist."}</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-bold">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-b border-cream-300 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
              VI
            </div>
            <div>
              <div className="font-bold text-slate-900">{post.author}</div>
              <div className="text-[11px] text-slate-500">
                Published {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Article link copied to clipboard!");
              }
            }}
            className="p-2 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
            title="Share Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render All Dynamic Page Builder Blocks */}
      <div className="pt-2">
        <BlockRenderer
          blocks={blocks}
          onProductViewDetails={(p) => setSelectedProductForModal(p)}
        />
      </div>

      {/* Author Bio Card at Bottom */}
      <div className="p-8 rounded-3xl bg-white border border-cream-300 flex flex-col sm:flex-row items-center gap-6 mt-16 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-md">
          VI
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-slate-900 text-base">Viraj Infotech Hardware Team</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            All tested laptops featured in our articles are backed by 40-point diagnostic reports, 6-12 months warranties, and 10-minute real-time stock locks.
          </p>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </article>
  );
}
