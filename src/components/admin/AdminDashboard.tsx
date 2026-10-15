"use client";

import React, { useState, useEffect } from "react";
import {
  Laptop,
  Lock,
  ShoppingBag,
  BookOpen,
  ArrowUpRight,
  Plus,
  MessageSquareText,
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    availableUnits: 0,
    activeLocks: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalBlogs: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  });

  const [recentLocks, setRecentLocks] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          const prods = data.products;
          const totalUnits = prods.reduce((sum: number, p: any) => sum + p.stock, 0);
          setStats((prev) => ({
            ...prev,
            totalProducts: prods.length,
            availableUnits: totalUnits,
          }));
        }
      });

    // Fetch locks
    fetch("/api/admin/locks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats((prev) => ({
            ...prev,
            activeLocks: data.stats.activeLocks,
          }));
          setRecentLocks((data.locks || []).slice(0, 5));
        }
      });

    // Fetch orders
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders) {
          const rev = data.orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0);
          setStats((prev) => ({
            ...prev,
            totalOrders: data.orders.length,
            totalRevenue: rev,
          }));
          setRecentOrders((data.orders || []).slice(0, 5));
        }
      });

    // Fetch blogs
    fetch("/api/blogs?admin=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.blogs) {
          setStats((prev) => ({
            ...prev,
            totalBlogs: data.blogs.length,
          }));
        }
      });

    // Fetch enquiries
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.enquiries) {
          const newCount = data.enquiries.filter((e: any) => e.status === "NEW").length;
          setStats((prev) => ({
            ...prev,
            totalEnquiries: data.enquiries.length,
            newEnquiries: newCount,
          }));
        }
      });
  }, []);

  return (
    <div className="space-y-8 text-slate-900">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Hardware Inventory */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Refurbished Stock</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
              <Laptop className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-sans">{stats.availableUnits}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Across {stats.totalProducts} laptop configurations</p>
          </div>
        </div>

        {/* Customer Enquiries */}
        <div
          onClick={() => onNavigate("enquiries")}
          className="p-6 rounded-3xl bg-brand-50/70 border border-brand-200 shadow-sm space-y-3 cursor-pointer hover:border-brand-500 transition-all group"
        >
          <div className="flex items-center justify-between text-brand-700">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Website Leads</span>
            <div className="p-2 rounded-xl bg-white text-brand-700 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <MessageSquareText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-brand-800 font-sans">{stats.totalEnquiries}</div>
            <p className="text-xs text-brand-600 mt-1 font-medium">{stats.newEnquiries} new awaiting callback</p>
          </div>
        </div>

        {/* Real-Time Stock Locks */}
        <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Active Stock Locks
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700 animate-pulse">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-900 font-sans">{stats.activeLocks}</div>
            <p className="text-xs text-amber-700 mt-1 font-medium">Units held in customer checkout sessions</p>
          </div>
        </div>

        {/* Confirmed Orders */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-sans">{stats.totalOrders}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">₹{Math.round(stats.totalRevenue).toLocaleString('en-IN')} in sales</p>
          </div>
        </div>

        {/* Blogs & Guides */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Page Builder Blogs</span>
            <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 font-sans">{stats.totalBlogs}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Published guides & teardowns</p>
          </div>
        </div>
      </div>

      {/* Quick Action Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate("enquiries")}
          className="p-6 rounded-3xl bg-white border border-brand-300 hover:border-brand-600 transition-all text-left group flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-brand-600 mb-1">
              Customer Leads {stats.newEnquiries > 0 ? `(${stats.newEnquiries} New)` : ""}
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">Review Enquiries</h4>
            <p className="text-xs text-slate-500 mt-0.5">Quick call/WhatsApp replies for lead submissions</p>
          </div>
          <div className="p-2.5 rounded-xl bg-brand-50 group-hover:bg-brand-600 group-hover:text-white transition-colors text-brand-700">
            <MessageSquareText className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={() => onNavigate("inventory")}
          className="p-6 rounded-3xl bg-white border border-cream-300 hover:border-brand-600 transition-all text-left group flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-brand-600 mb-1">Inventory</div>
            <h4 className="font-extrabold text-slate-900 text-sm">Add Refurbished Model</h4>
            <p className="text-xs text-slate-500 mt-0.5">Configure CPU, RAM, battery %, condition grade</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cream-100 group-hover:bg-brand-600 group-hover:text-white transition-colors text-slate-700">
            <Plus className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={() => onNavigate("builder")}
          className="p-6 rounded-3xl bg-white border border-cream-300 hover:border-brand-600 transition-all text-left group flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-brand-600 mb-1">Page Builder</div>
            <h4 className="font-extrabold text-slate-900 text-sm">Create New Blog Article</h4>
            <p className="text-xs text-slate-500 mt-0.5">Drag-and-drop blocks with embedded buy cards</p>
          </div>
          <div className="p-2.5 rounded-xl bg-cream-100 group-hover:bg-brand-600 group-hover:text-white transition-colors text-slate-700">
            <BookOpen className="w-5 h-5" />
          </div>
        </button>

        <button
          onClick={() => onNavigate("locks")}
          className="p-6 rounded-3xl bg-white border border-amber-300 hover:border-amber-500 transition-all text-left group flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-800 mb-1">Stock Monitor</div>
            <h4 className="font-extrabold text-slate-900 text-sm">Live Lock Dashboard</h4>
            <p className="text-xs text-slate-500 mt-0.5">View real-time checkout locks & manual unlocks</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors text-amber-800">
            <Lock className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Two-Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stock Locks */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Live Stock Reservation Locks
            </h3>
            <button
              onClick={() => onNavigate("locks")}
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentLocks.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-cream-300 rounded-2xl">
              No active or recent locks found.
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              {recentLocks.map((lock) => (
                <div
                  key={lock.id}
                  className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 truncate">
                      {lock.product?.name || "Product"}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Session: <span className="font-mono text-slate-700">{lock.sessionToken.substring(0, 14)}...</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        lock.status === "ACTIVE"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : lock.status === "PURCHASED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-cream-200 text-slate-600"
                      }`}
                    >
                      {lock.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="p-6 rounded-3xl bg-white border border-cream-300 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-cream-200 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-600" />
              Recent Confirmed Orders
            </h3>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-cream-300 rounded-2xl">
              No orders placed yet.
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span className="font-mono text-brand-700">{order.orderNumber}</span>
                      <span>•</span>
                      <span className="truncate">{order.customerName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {order.product?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-black text-brand-700">
                      ₹{Math.round(order.totalAmount).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
