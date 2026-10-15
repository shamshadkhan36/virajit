"use client";

import React, { useState, useEffect } from "react";
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
  KeyRound,
  ShieldAlert,
  LogOut,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<
    "overview" | "inventory" | "locks" | "orders" | "blogs" | "builder"
  >("overview");

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Check if already authenticated in session
    const savedAuth = sessionStorage.getItem("virajit_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("virajit_admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "Invalid username or password");
      }
    } catch (err: any) {
      setLoginError("Failed to authenticate. Please check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("virajit_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

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

  if (isLoadingAuth) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-cream-300 shadow-xl shadow-brand-900/5 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-white border border-cream-300 rounded-2xl flex items-center justify-center mx-auto shadow-sm p-1.5">
              <Image
                src="/logo.png"
                alt="Viraj Infotech"
                width={56}
                height={56}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Viraj Infotech Admin
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Enter your manager credentials to access store controls & inventory
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold text-slate-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold text-slate-900 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black text-sm tracking-wide shadow-md shadow-brand-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock Admin Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-cream-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-cream-50 text-slate-700 hover:text-slate-900 border border-cream-300 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </div>
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
