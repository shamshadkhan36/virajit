"use client";

import React, { useState } from "react";
import { BlogPost } from "@/types";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminInventory } from "@/components/admin/AdminInventory";
import { AdminLockMonitor } from "@/components/admin/AdminLockMonitor";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminBlogsList } from "@/components/admin/AdminBlogsList";
import { AdminPageBuilder } from "@/components/admin/AdminPageBuilder";
import {
  LayoutDashboard,
  Laptop,
  Lock,
  ShoppingBag,
  BookOpen,
  ArrowLeft,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "inventory" | "locks" | "orders" | "blogs" | "builder"
  >("overview");

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleEditBlogInBuilder = (post: BlogPost) => {
    setEditingPost(post);
    setActiveTab("builder");
  };

  const handleCreateNewBlog = () => {
    setEditingPost(null);
    setActiveTab("builder");
  };

  const handleBuilderSaved = () => {
    setActiveTab("blogs");
    setEditingPost(null);
  };

  const handleBuilderCancel = () => {
    setActiveTab("blogs");
    setEditingPost(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-900">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cream-300 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-black uppercase tracking-wider">
              Administration Control Hub
            </span>
            <span className="text-xs text-slate-500 font-medium">• Real-Time Stock & Page Builder</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1.5 tracking-tight">
            Viraj Infotech Management Hub
          </h1>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-cream-50 text-slate-700 hover:text-slate-900 border border-cream-300 text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </Link>
      </div>

      {/* Admin Tab Navigation */}
      {activeTab !== "builder" && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-cream-300 text-xs font-bold shadow-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "overview"
                ? "bg-brand-600 text-white font-black shadow-md shadow-brand-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-cream-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "inventory"
                ? "bg-brand-600 text-white font-black shadow-md shadow-brand-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-cream-100"
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Refurbished Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab("locks")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "locks"
                ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                : "text-amber-800 hover:text-amber-900 hover:bg-amber-50"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Live Stock Locks Monitor</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "orders"
                ? "bg-slate-900 text-white font-black shadow-md shadow-slate-900/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-cream-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Fulfillment</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === "blogs"
                ? "bg-brand-600 text-white font-black shadow-md shadow-brand-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-cream-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Page Builder Blogs</span>
          </button>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeTab === "overview" && (
          <AdminDashboard
            onNavigate={(tab) => {
              if (tab === "inventory") setActiveTab("inventory");
              else if (tab === "locks") setActiveTab("locks");
              else if (tab === "orders") setActiveTab("orders");
              else if (tab === "builder") handleCreateNewBlog();
            }}
          />
        )}

        {activeTab === "inventory" && <AdminInventory />}

        {activeTab === "locks" && <AdminLockMonitor />}

        {activeTab === "orders" && <AdminOrders />}

        {activeTab === "blogs" && (
          <AdminBlogsList
            onCreateNew={handleCreateNewBlog}
            onEditPost={handleEditBlogInBuilder}
          />
        )}

        {activeTab === "builder" && (
          <AdminPageBuilder
            initialPost={editingPost}
            onSaved={handleBuilderSaved}
            onCancel={handleBuilderCancel}
          />
        )}
      </div>
    </div>
  );
}
