"use client";

import React, { useState, useEffect } from "react";
import { Enquiry } from "@/types";
import {
  MessageSquareText,
  Search,
  Phone,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Trash2,
  RefreshCw,
  Download,
  Filter,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as any } : e))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;

    const headers = ["Date", "Name", "Phone", "Location", "Product", "Status"];
    const rows = enquiries.map((e) => [
      new Date(e.createdAt).toLocaleString("en-IN"),
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.location.replace(/"/g, '""')}"`,
      `"${(e.productName || "General").replace(/"/g, '""')}"`,
      e.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `virajit-enquiries-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (selectedStatus !== "ALL" && e.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        (e.productName && e.productName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // KPI counts
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "NEW").length;
  const contactedCount = enquiries.filter((e) => e.status === "CONTACTED").length;
  const convertedCount = enquiries.filter((e) => e.status === "CONVERTED").length;

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-cream-300 shadow-sm space-y-1">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Total Leads
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">All enquiries recorded</div>
        </div>

        <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 shadow-sm space-y-1">
          <div className="text-[11px] font-black uppercase tracking-wider text-brand-700">
            New / Uncontacted
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-700">{newCount}</div>
          <div className="text-[11px] text-brand-600 font-medium">Requires immediate callback</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm space-y-1">
          <div className="text-[11px] font-black uppercase tracking-wider text-amber-700">
            Contacted
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">{contactedCount}</div>
          <div className="text-[11px] text-amber-600 font-medium">In discussion</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-1">
          <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
            Converted
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">{convertedCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium">Store visit or purchased</div>
        </div>
      </div>

      {/* Action Bar (Search, Status Filter, Export CSV, Refresh) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-cream-300 shadow-sm">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name, Phone, Location..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-cream-300 bg-cream-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm font-semibold text-slate-900"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "NEW", "CONTACTED", "CONVERTED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
                selectedStatus === st
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-cream-100 text-slate-600 hover:bg-cream-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            disabled={enquiries.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-cream-300 hover:bg-cream-50 text-slate-700 text-xs font-bold transition-all disabled:opacity-50"
            title="Download Excel / CSV"
          >
            <Download className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={fetchEnquiries}
            className="p-2 rounded-xl bg-white border border-cream-300 hover:bg-cream-50 text-slate-700 transition-all"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-brand-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Enquiries Feed / Table */}
      <div className="bg-white rounded-2xl border border-cream-300 shadow-sm overflow-hidden">
        {isLoading && enquiries.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-bold">Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <MessageSquareText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-black text-slate-700">No enquiries found</h3>
            <p className="text-xs text-slate-400">
              {search || selectedStatus !== "ALL"
                ? "Try clearing your search or filters"
                : "Submitted customer inquiries from the website form will appear here in real-time."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-cream-200">
            {filteredEnquiries.map((enq) => {
              const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
              const waNumber = cleanPhone.startsWith("91")
                ? cleanPhone
                : cleanPhone.length === 10
                ? `91${cleanPhone}`
                : cleanPhone;

              const dateStr = new Date(enq.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={enq.id}
                  className="p-4 sm:p-5 hover:bg-cream-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Column: Customer details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-slate-900">
                        {enq.name}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          enq.status === "NEW"
                            ? "bg-brand-50 text-brand-700 border-brand-200 animate-pulse"
                            : enq.status === "CONTACTED"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : enq.status === "CONVERTED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        {enq.status}
                      </span>

                      {enq.productName && (
                        <span className="text-[11px] font-bold text-slate-600 bg-cream-100 px-2 py-0.5 rounded border border-cream-200">
                          {enq.productName}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600">
                      {/* Phone */}
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-600" />
                        {enq.phone}
                      </span>

                      {/* Location */}
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <strong>Location:</strong> {enq.location}
                      </span>

                      {/* Timestamp */}
                      <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3" />
                        {dateStr}
                      </span>
                    </div>

                    {enq.message && (
                      <p className="text-xs text-slate-500 italic bg-cream-100/60 p-2 rounded-lg">
                        &quot;{enq.message}&quot;
                      </p>
                    )}
                  </div>

                  {/* Right Column: Actions (WhatsApp, Call, Status Dropdown, Delete) */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Call Button */}
                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-600" />
                      <span>Call</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                        `Hello ${enq.name}, this is Viraj Infotech Kandivali West regarding your laptop enquiry. How can we help you?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Status Changer */}
                    <select
                      value={enq.status}
                      disabled={updatingId === enq.id}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className="px-2.5 py-2 rounded-xl border border-cream-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                    >
                      <option value="NEW">Status: NEW</option>
                      <option value="CONTACTED">Status: CONTACTED</option>
                      <option value="CONVERTED">Status: CONVERTED</option>
                      <option value="CLOSED">Status: CLOSED</option>
                    </select>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Enquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
