"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Clock,
  Unlock,
  RefreshCw,
  CheckCircle2,
  Laptop,
} from "lucide-react";

export const AdminLockMonitor: React.FC = () => {
  const [locks, setLocks] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeLocks: 0,
    purchasedLocks: 0,
    expiredLocks: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadLocks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/locks");
      const data = await res.json();
      if (data.success) {
        setLocks(data.locks || []);
        setStats(data.stats || { activeLocks: 0, purchasedLocks: 0, expiredLocks: 0 });
      }
    } catch (err) {
      console.error("Error loading locks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocks();
    const interval = setInterval(() => {
      setLocks((prev) =>
        prev.map((lock) => ({
          ...lock,
          lockSecondsRemaining: Math.max(0, (lock.lockSecondsRemaining || 0) - 1),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleForceRelease = async (lockId: string) => {
    if (!confirm("Are you sure you want to force release this reservation lock? The unit will immediately return to available stock.")) return;

    try {
      await fetch(`/api/admin/locks/${lockId}`, { method: "DELETE" });
      await loadLocks();
    } catch (err) {
      console.error("Error releasing lock:", err);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-700" />
            Live Stock Reservation Engine Monitor
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real-time tracking of units held during customer checkout sessions. Auto-expires after 10 minutes.
          </p>
        </div>

        <button
          onClick={loadLocks}
          disabled={isLoading}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-cream-100 text-slate-800 border border-cream-300 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Locks
        </button>
      </div>

      {/* Lock Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
              Active Locks (Held Now)
            </span>
            <div className="text-2xl font-black text-amber-900 font-sans mt-1">
              {stats.activeLocks}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-emerald-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">
              Converted to Orders
            </span>
            <div className="text-2xl font-black text-emerald-900 font-sans mt-1">
              {stats.purchasedLocks}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-cream-300 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Expired & Auto-Released
            </span>
            <div className="text-2xl font-black text-slate-800 font-sans mt-1">
              {stats.expiredLocks}
            </div>
          </div>
          <div className="p-2 rounded-xl bg-cream-100 text-slate-500">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Locks Table */}
      <div className="overflow-x-auto rounded-3xl border border-cream-300 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-slate-600 uppercase tracking-wider font-extrabold">
              <th className="p-4">Reserved Laptop</th>
              <th className="p-4">Session & Shopper</th>
              <th className="p-4">Lock Time Remaining</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Admin Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200 text-slate-700">
            {locks.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No reservation locks found in the database.
                </td>
              </tr>
            ) : (
              locks.map((lock) => (
                <tr key={lock.id} className="hover:bg-cream-50 transition-colors">
                  <td className="p-4">
                    <div className="font-extrabold text-slate-900 flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="truncate max-w-xs">
                        {lock.product?.name || "Product " + lock.productId}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Price: ₹{Math.round(lock.product?.price || 0).toLocaleString('en-IN')} • Grade: {lock.product?.conditionGrade}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-mono text-slate-800 text-[11px] truncate max-w-xs font-semibold">
                      {lock.sessionToken}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      IP: {lock.customerIp || "127.0.0.1"} • {new Date(lock.createdAt).toLocaleTimeString()}
                    </div>
                  </td>

                  <td className="p-4">
                    {lock.isStillActive && lock.lockSecondsRemaining > 0 ? (
                      <div className="flex items-center gap-1.5 text-amber-800 font-mono font-black">
                        <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                        <span>{formatSeconds(lock.lockSecondsRemaining)}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">00:00 (Elapsed)</span>
                    )}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                        lock.isStillActive
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : lock.status === "PURCHASED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : lock.status === "RELEASED"
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-cream-200 text-slate-600"
                      }`}
                    >
                      {lock.isStillActive ? "ACTIVE HOLD" : lock.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    {lock.isStillActive && (
                      <button
                        onClick={() => handleForceRelease(lock.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1 ml-auto transition-colors"
                        title="Force release this lock immediately"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Force Unlock</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
