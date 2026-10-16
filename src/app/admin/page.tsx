"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/types";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminInventory } from "@/components/admin/AdminInventory";
import { AdminLockMonitor } from "@/components/admin/AdminLockMonitor";
import { AdminOrders } from "@/components/admin/AdminOrders";
import { AdminBlogsList } from "@/components/admin/AdminBlogsList";
import { AdminPageBuilder } from "@/components/admin/AdminPageBuilder";
import { AdminEnquiries } from "@/components/admin/AdminEnquiries";
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
  ChevronRight,
  Menu,
  X,
  Store,
  MessageSquareText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type AdminTab = "overview" | "inventory" | "locks" | "orders" | "enquiries" | "blogs" | "builder";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
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
            <div className="w-44 h-16 bg-white border border-cream-300 rounded-2xl flex items-center justify-center mx-auto shadow-sm p-2">
              <Image
                src="/viraj-infotech-logo.png"
                alt="Viraj Infotech"
                width={200}
                height={64}
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

  const navMenuItems = [
    {
      id: "overview" as AdminTab,
      label: "Dashboard",
      description: "Overview & key metrics",
      icon: LayoutDashboard,
      badge: "Summary",
    },
    {
      id: "inventory" as AdminTab,
      label: "Refurbished Inventory",
      description: "Stock, CSV bulk upload & add",
      icon: Laptop,
      badge: "Products",
    },
    {
      id: "locks" as AdminTab,
      label: "Live Stock Locks",
      description: "Shopper reservation monitor",
      icon: Lock,
      badge: "Real-time",
    },
    {
      id: "orders" as AdminTab,
      label: "Orders & Fulfillment",
      description: "Customer orders & payments",
      icon: ShoppingBag,
      badge: "Orders",
    },
    {
      id: "enquiries" as AdminTab,
      label: "Customer Enquiries",
      description: "Website lead form submissions",
      icon: MessageSquareText,
      badge: "Leads",
    },
    {
      id: "blogs" as AdminTab,
      label: "Page Builder Blogs",
      description: "Articles & visual page builder",
      icon: BookOpen,
      badge: "Content",
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-slate-900">
      {/* Top Header Strip */}
      <div className="flex items-center justify-between gap-4 border-b border-cream-300 pb-5 mb-6">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-cream-300 text-slate-700 hover:bg-cream-100"
            aria-label="Toggle Navigation Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-black uppercase tracking-wider">
                Administration Control Hub
              </span>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium">
                • Kandivali West Store Management
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Viraj Infotech Management Hub
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock &amp; Sign Out</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-cream-50 text-slate-700 hover:text-slate-900 border border-cream-300 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Storefront</span>
          </Link>
        </div>
      </div>

      {/* Main Two-Column Layout with Vertical Sidebar on Left */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Vertical Sidebar */}
        <aside
          className={`${
            mobileSidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-64 xl:w-72 shrink-0 bg-white rounded-2xl border border-cream-300 shadow-sm p-3 space-y-4 lg:sticky lg:top-24 z-20`}
        >
          {/* Sidebar Section Header */}
          <div className="px-3 py-2 border-b border-cream-200 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Admin Navigation
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Vertical Menu Buttons */}
          <nav className="space-y-1.5">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${
                    isActive
                      ? "bg-brand-600 text-white font-black shadow-md shadow-brand-600/25"
                      : "text-slate-700 hover:text-slate-900 hover:bg-cream-100 font-bold"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-cream-100 text-slate-700 group-hover:bg-cream-200 group-hover:text-brand-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate">{item.label}</div>
                      <div
                        className={`text-[10px] truncate font-medium ${
                          isActive ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive
                        ? "text-white translate-x-0.5"
                        : "text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Quick Store Info Card */}
          <div className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-black">
              <Store className="w-3.5 h-3.5 text-brand-600" />
              <span>Store Presence</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              S.V. Road, Kandivali West, Mumbai. All product stock updates sync instantly.
            </p>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 w-full">
          {activeTab === "overview" && (
            <AdminDashboard
              onNavigate={(tab) => {
                if (tab === "inventory") setActiveTab("inventory");
                else if (tab === "locks") setActiveTab("locks");
                else if (tab === "orders") setActiveTab("orders");
                else if (tab === "enquiries") setActiveTab("enquiries");
                else if (tab === "builder") handleCreateNewBlog();
              }}
            />
          )}

          {activeTab === "inventory" && <AdminInventory />}

          {activeTab === "locks" && <AdminLockMonitor />}

          {activeTab === "orders" && <AdminOrders />}

          {activeTab === "enquiries" && <AdminEnquiries />}

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
        </main>
      </div>
    </div>
  );
}
