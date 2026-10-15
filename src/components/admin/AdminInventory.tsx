"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Product } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  BatteryCharging,
  X,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// RFC-4180 compliant CSV line parser (handles quoted commas and escaped double quotes)
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current.trim());
  return result;
}

function parseCsvContent(csvText: string) {
  const lines = csvText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) =>
    h.toLowerCase().replace(/[^a-z0-9]/g, "")
  );

  const items: any[] = [];

  for (let r = 1; r < lines.length; r++) {
    const cols = parseCsvLine(lines[r]);
    if (cols.every((c) => !c)) continue;

    const rowMap: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowMap[h] = cols[idx] !== undefined ? cols[idx] : "";
    });

    const brand = rowMap["brand"] || "Dell";
    const model = rowMap["model"] || "";
    if (!model && !rowMap["producttitle"] && !rowMap["name"]) continue;

    items.push({
      name: rowMap["producttitle"] || rowMap["name"] || "",
      brand,
      model,
      processor: rowMap["processor"] || rowMap["cpu"] || "Intel Core i5",
      ram: rowMap["ram"] || "8GB",
      storage: rowMap["storage"] || rowMap["ssd"] || "256GB SSD",
      screen: rowMap["display"] || rowMap["screen"] || '14" FHD',
      touchScreen: rowMap["touchscreen"] || rowMap["touch"] || "No",
      price:
        rowMap["sellingprice"] ||
        rowMap["price"] ||
        rowMap["sellingpricers"] ||
        "22299",
      originalPrice:
        rowMap["originalprice"] ||
        rowMap["mrp"] ||
        rowMap["originalpricers"] ||
        "44990",
      color: rowMap["color"] || "Black",
      bestFor: rowMap["bestfor"] || "Office",
      warrantyText: rowMap["warranty"] || "Warranty Included",
      warrantyDuration:
        rowMap["warrantyduration"] ||
        rowMap["column1"] ||
        rowMap["warrantymonths"] ||
        "1 MONTH",
      status: rowMap["status"] || "In stock",
      isFeatured:
        rowMap["featureneartopofcatalogue"] ||
        rowMap["featured"] ||
        rowMap["isfeatured"] ||
        "No",
      stock: rowMap["stock"] || "2",
      image1: rowMap["imagepath"] || rowMap["image1"] || rowMap["productimages1"] || "",
      image2: rowMap["image2"] || rowMap["productimages2"] || "",
      image3: rowMap["image3"] || rowMap["productimages3"] || "",
    });
  }

  return items;
}

export const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Bulk CSV Upload State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [parsedCsvItems, setParsedCsvItems] = useState<any[]>([]);
  const [csvFileName, setCsvFileName] = useState<string>("");
  const [uploadMode, setUploadMode] = useState<"append" | "replace">("append");
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [bulkMessage, setBulkMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    brand: "Dell",
    model: "",
    processor: "",
    ram: "8GB",
    storage: "256GB SSD",
    screen: '14" FHD',
    gpu: "Intel Integrated Graphics",
    touchScreen: "No",
    color: "Black",
    bestFor: "Office",
    warrantyText: "Warranty Included",
    warrantyDuration: "1 MONTH",
    batteryHealth: 95,
    conditionGrade: "Grade A+ (Pristine)",
    price: 22299,
    originalPrice: 44990,
    stock: 2,
    warrantyMonths: 1,
    includedAccessories:
      "Original Adapter & Power Cord, Free Laptop Bag & Wireless Mouse, Viraj Infotech Warranty Card",
    description: "Certified refurbished laptop tested by Viraj Infotech.",
    images:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
  });

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      brand: "Dell",
      model: "",
      processor: "",
      ram: "8GB",
      storage: "256GB SSD",
      screen: '14" FHD',
      gpu: "Intel Integrated Graphics",
      touchScreen: "No",
      color: "Black",
      bestFor: "Office",
      warrantyText: "Warranty Included",
      warrantyDuration: "1 MONTH",
      batteryHealth: 95,
      conditionGrade: "Grade A+ (Pristine)",
      price: 22299,
      originalPrice: 44990,
      stock: 2,
      warrantyMonths: 1,
      includedAccessories:
        "Original Adapter & Power Cord, Free Laptop Bag & Wireless Mouse, Viraj Infotech Warranty Card",
      description: "Certified refurbished laptop tested by Viraj Infotech.",
      images:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80",
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    let imgUrl = "";
    try {
      const imgs = JSON.parse(p.images);
      imgUrl = imgs[0] || "";
    } catch {
      imgUrl = p.images;
    }

    setFormData({
      name: p.name,
      brand: p.brand,
      model: p.model,
      processor: p.processor,
      ram: p.ram,
      storage: p.storage,
      screen: p.screen,
      gpu: p.gpu,
      touchScreen: p.touchScreen || "No",
      color: p.color || "Black",
      bestFor: p.bestFor || "Office",
      warrantyText: p.warrantyText || "Warranty Included",
      warrantyDuration: p.warrantyDuration || "1 MONTH",
      batteryHealth: p.batteryHealth,
      conditionGrade: p.conditionGrade,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      warrantyMonths: p.warrantyMonths,
      includedAccessories: p.includedAccessories,
      description: p.description,
      images: imgUrl,
      isFeatured: p.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this laptop from inventory?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      await loadProducts();
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const payload = {
      ...formData,
      images: [formData.images],
    };

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to save product.");
        setIsLoading(false);
        return;
      }

      setIsModalOpen(false);
      setIsLoading(false);
      await loadProducts();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = String(event.target?.result || "");
      const parsed = parseCsvContent(text);
      setParsedCsvItems(parsed);
      if (parsed.length === 0) {
        setBulkMessage({
          type: "error",
          text: "Could not find valid laptop rows. Please check the CSV column headers.",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmBulkUpload = async () => {
    if (parsedCsvItems.length === 0) return;
    setIsUploadingCsv(true);
    setBulkMessage(null);

    try {
      const res = await fetch("/api/admin/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: parsedCsvItems,
          mode: uploadMode,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setBulkMessage({
          type: "error",
          text: data.error || "Bulk upload failed.",
        });
        setIsUploadingCsv(false);
        return;
      }

      setBulkMessage({
        type: "success",
        text: `Successfully imported ${data.count} refurbished laptops into inventory!`,
      });
      setIsUploadingCsv(false);
      await loadProducts();
    } catch (err: any) {
      setBulkMessage({
        type: "error",
        text: err.message || "Error uploading CSV.",
      });
      setIsUploadingCsv(false);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.processor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-900">
      {/* Header with Search, CSV Template Download, Bulk Upload CSV, and Add Button */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-cream-300 text-slate-900 text-xs focus:outline-none focus:border-brand-600 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/sample-catalogue-virajit.csv"
            download="Sample_Bulk_Upload_VirajIT.csv"
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-cream-100 text-slate-800 border border-cream-300 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-brand-600" />
            <span>Download CSV Format</span>
          </a>

          <button
            onClick={() => {
              setParsedCsvItems([]);
              setCsvFileName("");
              setBulkMessage(null);
              setIsBulkModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4 text-lime-400" />
            <span>Bulk Upload CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-brand-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Single Laptop</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto rounded-3xl border border-cream-300 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-slate-600 uppercase tracking-wider font-extrabold">
              <th className="p-4">Product / Model</th>
              <th className="p-4">Specs &amp; Display</th>
              <th className="p-4">Warranty</th>
              <th className="p-4">Price (INR)</th>
              <th className="p-4">Stock &amp; Hold</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200 text-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No refurbished laptops found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                let imgUrl = "";
                try {
                  const imgs = JSON.parse(p.images);
                  imgUrl = imgs[0] || "";
                } catch {
                  imgUrl = p.images;
                }

                return (
                  <tr key={p.id} className="hover:bg-cream-50 transition-colors">
                    {/* Photo & Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-200 border border-cream-300 shrink-0">
                          {imgUrl && (
                            <Image
                              src={imgUrl}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <div className="font-extrabold text-slate-900 truncate">{p.name}</div>
                          <div className="text-[11px] text-brand-600 font-bold">
                            {p.brand} • {p.model} • {p.color || "Black"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Specs & Display */}
                    <td className="p-4 space-y-1">
                      <div className="text-slate-800 font-medium truncate max-w-xs">
                        {p.processor} • {p.ram} • {p.storage}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-cream-100 border border-cream-300 text-[10px] font-bold">
                          {p.screen}
                        </span>
                        {p.touchScreen === "Yes" && (
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold">
                            Touch Screen
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Warranty */}
                    <td className="p-4">
                      <div className="font-bold text-emerald-700">
                        {p.warrantyText || "Warranty Included"}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold">
                        {p.warrantyDuration || `${p.warrantyMonths}M`}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <div className="font-sans font-black text-slate-900 text-sm">
                        ₹{Math.round(p.price).toLocaleString("en-IN")}
                      </div>
                      {p.originalPrice > p.price && (
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{Math.round(p.originalPrice).toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>

                    {/* Stock & Hold Status */}
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{p.stock} units total</span>
                      </div>
                      <div className="text-[11px]">
                        {p.availableStock !== undefined && p.availableStock > 0 ? (
                          <span className="text-emerald-700 font-bold">
                            {p.availableStock} available
                          </span>
                        ) : (
                          <span className="text-amber-800 font-bold">
                            All units locked / held
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 transition-colors shadow-sm"
                          title="Edit Specs"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* BULK UPLOAD CSV MODAL */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-cream-300 rounded-[32px] p-6 sm:p-8 text-slate-900 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cream-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    Bulk Upload Laptops via CSV
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload a CSV matching your Excel catalogue columns to add or replace inventory in seconds.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-cream-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Required CSV Columns Guide Box */}
            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 uppercase tracking-wider">
                  Supported CSV Column Headers
                </span>
                <a
                  href="/sample-catalogue-virajit.csv"
                  download="Sample_Bulk_Upload_VirajIT.csv"
                  className="text-brand-600 font-black hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Sample CSV Template
                </a>
              </div>
              <div className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-cream-200 text-slate-700 overflow-x-auto whitespace-nowrap">
                Brand, Model, Processor, RAM, Storage, Display, Touch screen, Selling Price, Original Price, Color, Best For, Warranty, Warranty Duration, Status, Feature Near Top of Catalogue, Stock, Image 1, Image 2, Image 3
              </div>
            </div>

            {/* File Drop / Picker & Mode Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-5 rounded-2xl border-2 border-dashed border-brand-400 bg-brand-50/50 hover:bg-brand-50 text-center space-y-1 transition-colors"
                >
                  <Upload className="w-6 h-6 text-brand-600 mx-auto" />
                  <div className="text-xs font-black text-slate-900">
                    {csvFileName ? `Selected: ${csvFileName}` : "Click to Select CSV File (.csv)"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {parsedCsvItems.length > 0
                      ? `${parsedCsvItems.length} laptop rows ready to import`
                      : "Supports Excel exported CSV (UTF-8)"}
                  </div>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 space-y-2.5 text-xs">
                <div className="font-black text-slate-800 uppercase tracking-wider">
                  Import Mode
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="uploadMode"
                    checked={uploadMode === "append"}
                    onChange={() => setUploadMode("append")}
                    className="mt-0.5 text-brand-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Append to Current Inventory</div>
                    <div className="text-[11px] text-slate-500">
                      Keeps existing laptops and adds all rows from the CSV.
                    </div>
                  </div>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="uploadMode"
                    checked={uploadMode === "replace"}
                    onChange={() => setUploadMode("replace")}
                    className="mt-0.5 text-brand-600"
                  />
                  <div>
                    <div className="font-bold text-red-700">Replace Entire Inventory</div>
                    <div className="text-[11px] text-slate-500">
                      Clears existing catalogue and replaces it with the uploaded CSV.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {bulkMessage && (
              <div
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
                  bulkMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-red-50 border-red-300 text-red-700"
                }`}
              >
                {bulkMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{bulkMessage.text}</span>
              </div>
            )}

            {/* Preview Table of Parsed CSV Rows */}
            {parsedCsvItems.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-700">
                  Preview ({parsedCsvItems.length} Laptops Parsed):
                </div>
                <div className="max-h-56 overflow-y-auto rounded-2xl border border-cream-300">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead className="bg-cream-100 border-b border-cream-300 text-slate-600 font-extrabold sticky top-0">
                      <tr>
                        <th className="p-2.5">#</th>
                        <th className="p-2.5">Brand &amp; Model</th>
                        <th className="p-2.5">Processor / RAM / SSD</th>
                        <th className="p-2.5">Display &amp; Touch</th>
                        <th className="p-2.5">Selling ₹</th>
                        <th className="p-2.5">Original ₹</th>
                        <th className="p-2.5">Warranty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-200">
                      {parsedCsvItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-cream-50">
                          <td className="p-2.5 font-mono text-slate-400">{idx + 1}</td>
                          <td className="p-2.5 font-bold text-slate-900">
                            {item.brand} {item.model}
                          </td>
                          <td className="p-2.5">
                            {item.processor} • {item.ram} • {item.storage}
                          </td>
                          <td className="p-2.5">
                            {item.screen} (Touch: {item.touchScreen})
                          </td>
                          <td className="p-2.5 font-black text-brand-700">
                            ₹{Number(String(item.price).replace(/[^0-9.]/g, "")).toLocaleString("en-IN")}
                          </td>
                          <td className="p-2.5 text-slate-400 line-through">
                            ₹{Number(String(item.originalPrice).replace(/[^0-9.]/g, "")).toLocaleString("en-IN")}
                          </td>
                          <td className="p-2.5">{item.warrantyDuration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-cream-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-700 text-xs font-bold"
              >
                Close
              </button>
              <button
                type="button"
                disabled={parsedCsvItems.length === 0 || isUploadingCsv}
                onClick={handleConfirmBulkUpload}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:bg-slate-300 text-white text-xs font-black shadow-md flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>
                  {isUploadingCsv
                    ? "Importing..."
                    : `Import ${parsedCsvItems.length} Laptops Now`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Single Laptop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-cream-300 rounded-[32px] p-6 text-slate-900 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <h3 className="font-black text-base text-slate-900">
                {editingProduct
                  ? "Edit Refurbished Laptop Specs"
                  : "Add Refurbished Laptop to Inventory"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-cream-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Brand *</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Apple">Apple</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Acer">Acer</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Model *</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Latitude 7480 / 840 G7"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='DELL Latitude 7480 | Intel Core i5 6th Gen | 14" FHD | Refurbished'
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Processor *</label>
                  <input
                    type="text"
                    required
                    value={formData.processor}
                    onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                    placeholder="Intel Core i5 6th Gen"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">RAM *</label>
                  <input
                    type="text"
                    required
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    placeholder="8GB"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Storage *</label>
                  <input
                    type="text"
                    required
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    placeholder="256GB SSD"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Display *</label>
                  <input
                    type="text"
                    required
                    value={formData.screen}
                    onChange={(e) => setFormData({ ...formData, screen: e.target.value })}
                    placeholder='14" FHD'
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Touch Screen</label>
                  <select
                    value={formData.touchScreen}
                    onChange={(e) => setFormData({ ...formData, touchScreen: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Black / Grey / Silver"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Best For</label>
                  <input
                    type="text"
                    value={formData.bestFor}
                    onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                    placeholder="Office"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Warranty Duration</label>
                  <input
                    type="text"
                    value={formData.warrantyDuration}
                    onChange={(e) =>
                      setFormData({ ...formData, warrantyDuration: e.target.value })
                    }
                    placeholder="1 MONTH / 36 MONTHS"
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Total Stock Count *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-cream-200 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-cream-300 text-brand-600"
                  />
                  <span>Feature Near Top of Catalogue</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black shadow-sm"
                  >
                    {isLoading ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
