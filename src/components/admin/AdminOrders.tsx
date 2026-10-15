"use client";

import React, { useState, useEffect } from "react";
import { Order } from "@/types";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Truck,
  MapPin,
  Mail,
  Phone,
  User,
  CreditCard,
  Laptop,
} from "lucide-react";

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error loading orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.product?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-600" />
            Customer Orders & Fulfillment
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            View orders placed through stock locks. Physical units have been permanently deducted.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600 shadow-sm"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-3xl border border-cream-300">
            No orders found matching your criteria.
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-white border border-cream-300 space-y-4 shadow-sm"
            >
              {/* Top Row: Order Number, Date, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-500 ml-2">
                      • {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {order.status}
                  </span>
                  <span className="text-base font-black font-sans text-brand-700">
                    ₹{Math.round(order.totalAmount).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Product Info */}
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 space-y-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Laptop className="w-3 h-3 text-brand-600" /> Laptop Purchased
                  </span>
                  <div className="font-bold text-slate-900 truncate">
                    {order.product?.name || "Product ID: " + order.productId}
                  </div>
                  <div className="text-slate-500">
                    Grade: {order.product?.conditionGrade} • {order.product?.warrantyMonths}M Warranty
                  </div>
                </div>

                {/* Customer Contact */}
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 space-y-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-600" /> Customer Contact
                  </span>
                  <div className="font-bold text-slate-900">{order.customerName}</div>
                  <div className="text-slate-600 flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 shrink-0" /> {order.customerEmail}
                  </div>
                  <div className="text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 shrink-0" /> {order.customerPhone}
                  </div>
                </div>

                {/* Shipping & Payment */}
                <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 space-y-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Truck className="w-3 h-3 text-amber-700" /> Shipping & Payment
                  </span>
                  <div className="text-slate-900 flex items-start gap-1 font-medium">
                    <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-slate-400" />
                    <span>{order.shippingAddress}, {order.city} {order.postalCode}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1 pt-1">
                    <CreditCard className="w-3 h-3 shrink-0" /> Method: {order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
