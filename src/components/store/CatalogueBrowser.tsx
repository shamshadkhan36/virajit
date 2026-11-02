"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { FORMATTED_PRODUCTS } from "@/lib/catalogue-data";
import { ProductCard } from "@/components/store/ProductCard";

interface CatalogueBrowserProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  initialMaxPrice?: number;
  initialMinPrice?: number;
  initialOnlyTouch?: boolean;
}

const BUDGET_OPTIONS: [string, string][] = [
  ["under25", "Under ₹25,000"],
  ["25to40", "₹25,000 – ₹40,000"],
  ["above40", "Above ₹40,000"],
];

function normalizeProcessor(proc: string): string {
  const p = (proc || "").toLowerCase();
  if (p.includes("i7")) return "Core i7";
  if (p.includes("i5")) return "Core i5";
  if (p.includes("i3")) return "Core i3";
  if (p.includes("ryzen 7")) return "Ryzen 7";
  if (p.includes("ryzen 5")) return "Ryzen 5";
  if (p.includes("m1") || p.includes("m2") || p.includes("m3")) return "Apple Silicon";
  return proc || "Other";
}

function normalizeScreen(screen: string): string {
  const s = (screen || "").toLowerCase();
  if (s.includes("12.5") || s.includes("12")) return "12.5-inch";
  if (s.includes("13.3") || s.includes("13")) return "13.3-inch";
  if (s.includes("14")) return "14-inch";
  if (s.includes("15.6") || s.includes("15")) return "15.6-inch";
  if (s.includes("16")) return "16-inch";
  return screen || '14-inch';
}

function normalizeRam(ram: string): string {
  const r = (ram || "").toUpperCase().replace(/\s*RAM/g, "").trim();
  if (r.includes("32")) return "32GB";
  if (r.includes("16")) return "16GB";
  if (r.includes("8")) return "8GB";
  if (r.includes("4")) return "4GB";
  return r || "8GB";
}

function normalizeStorage(storage: string): string {
  const st = (storage || "").toUpperCase();
  if (st.includes("1TB") || st.includes("1 TB")) return "1TB SSD";
  if (st.includes("512")) return "512GB SSD";
  if (st.includes("256")) return "256GB SSD";
  if (st.includes("128")) return "128GB SSD";
  return storage || "256GB SSD";
}

function normalizeWarranty(p: Product): string {
  const w = p.warrantyDuration || p.warrantyText || "";
  const months = p.warrantyMonths || 6;
  if (months === 1 || w.toLowerCase().includes("1 month")) return "1 Month";
  if (months === 3 || w.toLowerCase().includes("3 month")) return "3 Months";
  if (months === 6 || w.toLowerCase().includes("6 month")) return "6 Months";
  if (months === 12 || months === 24 || months === 36 || w.toLowerCase().includes("1 year") || w.toLowerCase().includes("12 month")) return "12 Months";
  return "6 Months";
}

const CatalogueBrowserContent: React.FC<CatalogueBrowserProps> = ({
  initialMaxPrice,
  initialMinPrice,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(FORMATTED_PRODUCTS);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedWarranties, setSelectedWarranties] = useState<string[]>([]);
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedScreens, setSelectedScreens] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [sort, setSort] = useState<string>("recommended");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Read initial filters from search params
  useEffect(() => {
    if (!searchParams) return;
    const b = searchParams.get("brand");
    if (b) setSelectedBrands(b.split(",").filter(Boolean));

    const w = searchParams.get("warranty");
    if (w) setSelectedWarranties(w.split(",").filter(Boolean));

    const proc = searchParams.get("processor");
    if (proc) setSelectedProcessors(proc.split(",").filter(Boolean));

    const r = searchParams.get("ram");
    if (r) setSelectedRam(r.split(",").filter(Boolean));

    const st = searchParams.get("storage");
    if (st) setSelectedStorage(st.split(",").filter(Boolean));

    const scr = searchParams.get("screen");
    if (scr) setSelectedScreens(scr.split(",").filter(Boolean));

    const bud = searchParams.get("budget");
    if (bud && BUDGET_OPTIONS.some(([k]) => k === bud)) {
      setSelectedBudget(bud);
    } else if (initialMaxPrice === 25000) {
      setSelectedBudget("under25");
    } else if (initialMinPrice === 40000) {
      setSelectedBudget("above40");
    }

    const s = searchParams.get("sort");
    if (s && ["recommended", "price-asc", "price-desc", "newest"].includes(s)) {
      setSort(s);
    }
  }, [searchParams, initialMaxPrice, initialMinPrice]);

  // Sync to URL
  const syncToUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedBrands.length > 0) params.set("brand", selectedBrands.join(","));
    if (selectedWarranties.length > 0) params.set("warranty", selectedWarranties.join(","));
    if (selectedProcessors.length > 0) params.set("processor", selectedProcessors.join(","));
    if (selectedRam.length > 0) params.set("ram", selectedRam.join(","));
    if (selectedStorage.length > 0) params.set("storage", selectedStorage.join(","));
    if (selectedScreens.length > 0) params.set("screen", selectedScreens.join(","));
    if (selectedBudget) params.set("budget", selectedBudget);
    if (sort !== "recommended") params.set("sort", sort);

    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [
    selectedBrands,
    selectedWarranties,
    selectedProcessors,
    selectedRam,
    selectedStorage,
    selectedScreens,
    selectedBudget,
    sort,
  ]);

  useEffect(() => {
    syncToUrl();
  }, [syncToUrl]);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        // Fallback to FORMATTED_PRODUCTS
      }
    };
    loadProducts();
  }, []);

  // Filter calculations
  const normalizedProducts = useMemo(() => {
    return products.map((p) => ({
      ...p,
      normBrand: p.brand,
      normProcessor: normalizeProcessor(p.processor),
      normRam: normalizeRam(p.ram),
      normStorage: normalizeStorage(p.storage),
      normScreen: normalizeScreen(p.screen || ""),
      normWarranty: normalizeWarranty(p),
    }));
  }, [products]);

  // Unique lists for controls
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normBrand))).sort();
  }, [normalizedProducts]);

  const uniqueWarranties = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normWarranty))).sort();
  }, [normalizedProducts]);

  const uniqueProcessors = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normProcessor))).sort();
  }, [normalizedProducts]);

  const uniqueRam = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normRam))).sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10)
    );
  }, [normalizedProducts]);

  const uniqueStorage = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normStorage))).sort();
  }, [normalizedProducts]);

  const uniqueScreens = useMemo(() => {
    return Array.from(new Set(normalizedProducts.map((p) => p.normScreen))).sort();
  }, [normalizedProducts]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return normalizedProducts
      .filter((p) => {
        // Brand filter (OR within group)
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.normBrand)) {
          return false;
        }
        // Warranty filter
        if (selectedWarranties.length > 0 && !selectedWarranties.includes(p.normWarranty)) {
          return false;
        }
        // Processor filter
        if (selectedProcessors.length > 0 && !selectedProcessors.includes(p.normProcessor)) {
          return false;
        }
        // RAM filter
        if (selectedRam.length > 0 && !selectedRam.includes(p.normRam)) {
          return false;
        }
        // Storage filter
        if (selectedStorage.length > 0 && !selectedStorage.includes(p.normStorage)) {
          return false;
        }
        // Screen filter
        if (selectedScreens.length > 0 && !selectedScreens.includes(p.normScreen)) {
          return false;
        }
        // Budget filter
        if (selectedBudget === "under25" && p.price >= 25000) return false;
        if (selectedBudget === "25to40" && (p.price < 25000 || p.price > 40000)) return false;
        if (selectedBudget === "above40" && p.price <= 40000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "newest") {
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        }
        // Recommended: in stock first, then featured
        const aStock = a.stock > 0 ? 0 : 1;
        const bStock = b.stock > 0 ? 0 : 1;
        if (aStock !== bStock) return aStock - bStock;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    normalizedProducts,
    selectedBrands,
    selectedWarranties,
    selectedProcessors,
    selectedRam,
    selectedStorage,
    selectedScreens,
    selectedBudget,
    sort,
  ]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const toggleWarranty = (w: string) => {
    setSelectedWarranties((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]
    );
  };

  const toggleProcessor = (pr: string) => {
    setSelectedProcessors((prev) =>
      prev.includes(pr) ? prev.filter((x) => x !== pr) : [...prev, pr]
    );
  };

  const toggleRam = (r: string) => {
    setSelectedRam((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const toggleStorage = (st: string) => {
    setSelectedStorage((prev) =>
      prev.includes(st) ? prev.filter((x) => x !== st) : [...prev, st]
    );
  };

  const toggleScreen = (sc: string) => {
    setSelectedScreens((prev) =>
      prev.includes(sc) ? prev.filter((x) => x !== sc) : [...prev, sc]
    );
  };

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedWarranties([]);
    setSelectedProcessors([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setSelectedScreens([]);
    setSelectedBudget("");
    setSort("recommended");
  };

  const activeFilterCount =
    selectedBrands.length +
    selectedWarranties.length +
    selectedProcessors.length +
    selectedRam.length +
    selectedStorage.length +
    selectedScreens.length +
    (selectedBudget ? 1 : 0);

  const scrollToCatalogue = () => {
    const el = document.getElementById("catalogue");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderFilterControls = (budgetRadioName: string) => (
    <>
      {/* Brand */}
      <div className="filter-group">
        <h3>Brand</h3>
        <div className="filter-options">
          {uniqueBrands.map((b) => {
            const count = normalizedProducts.filter((p) => p.normBrand === b).length;
            const checked = selectedBrands.includes(b);
            return (
              <label key={b}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(b)}
                />
                <span>{b}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h3>Price</h3>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              name={budgetRadioName}
              checked={selectedBudget === ""}
              onChange={() => setSelectedBudget("")}
            />
            <span>All prices</span>
          </label>
          {BUDGET_OPTIONS.map(([val, label]) => (
            <label key={val}>
              <input
                type="radio"
                name={budgetRadioName}
                checked={selectedBudget === val}
                onChange={() => setSelectedBudget(val)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Warranty */}
      <div className="filter-group">
        <h3>Warranty</h3>
        <div className="filter-options">
          {uniqueWarranties.map((w) => {
            const count = normalizedProducts.filter((p) => p.normWarranty === w).length;
            const checked = selectedWarranties.includes(w);
            return (
              <label key={w}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleWarranty(w)}
                />
                <span>{w}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Processor */}
      <details className="filter-group">
        <summary>Processor</summary>
        <div className="filter-options">
          {uniqueProcessors.map((proc) => {
            const count = normalizedProducts.filter((p) => p.normProcessor === proc).length;
            const checked = selectedProcessors.includes(proc);
            return (
              <label key={proc}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleProcessor(proc)}
                />
                <span>{proc}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </details>

      {/* RAM */}
      <details className="filter-group">
        <summary>RAM</summary>
        <div className="filter-options">
          {uniqueRam.map((r) => {
            const count = normalizedProducts.filter((p) => p.normRam === r).length;
            const checked = selectedRam.includes(r);
            return (
              <label key={r}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleRam(r)}
                />
                <span>{r}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </details>

      {/* Storage */}
      <details className="filter-group">
        <summary>Storage</summary>
        <div className="filter-options">
          {uniqueStorage.map((st) => {
            const count = normalizedProducts.filter((p) => p.normStorage === st).length;
            const checked = selectedStorage.includes(st);
            return (
              <label key={st}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleStorage(st)}
                />
                <span>{st}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </details>

      {/* Screen Size */}
      <details className="filter-group">
        <summary>Screen Size</summary>
        <div className="filter-options">
          {uniqueScreens.map((sc) => {
            const count = normalizedProducts.filter((p) => p.normScreen === sc).length;
            const checked = selectedScreens.includes(sc);
            return (
              <label key={sc}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleScreen(sc)}
                />
                <span>{sc}</span>
                <span>{count}</span>
              </label>
            );
          })}
        </div>
      </details>
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to products
      </a>

      {/* Top Preview Ribbon */}
      <div className="preview-ribbon">
        CATALOGUE WIREFRAME{" "}
        <span>Sample listings only · prices, warranty and stock require approved live data</span>
      </div>

      {/* Breadcrumb */}
      <div className="shell breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Refurbished Laptops</span>
      </div>

      {/* Intro Section */}
      <section className="intro shell" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line"></span>REFURBISHED LAPTOP COLLECTION
          </p>
          <h1 id="page-title">
            Shop Refurbished <em>Laptops</em>
          </h1>
          <p className="lead">
            Explore tested refurbished laptops from leading brands. Compare specifications,
            prices and warranty options to find a laptop suited to your needs.
          </p>
        </div>
        <div className="trust-points">
          <span>✓ &nbsp; Tested Refurbished Laptops</span>
          <span>✓ &nbsp; Warranty Details on Every Listing</span>
          <span>✓ &nbsp; Inspect In-Store Before Buying</span>
        </div>
      </section>

      {/* Section 01 / START HERE - Shortcuts */}
      <section className="shortcuts shell" aria-labelledby="shortcuts-title">
        <div className="shortcut-heading">
          <p className="eyebrow">01 / START HERE</p>
          <h2 id="shortcuts-title">Find Laptops Your Way</h2>
        </div>
        <div className="shortcut-groups">
          <div>
            <strong>Shop by Brand</strong>
            <div className="chip-row">
              {uniqueBrands.map((b) => {
                const isActive = selectedBrands.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    className={`chip ${isActive ? "active" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      toggleBrand(b);
                      scrollToCatalogue();
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <strong>Shop by Budget</strong>
            <div className="chip-row">
              {BUDGET_OPTIONS.map(([val, label]) => {
                const isActive = selectedBudget === val;
                return (
                  <button
                    key={val}
                    type="button"
                    className={`chip ${isActive ? "active" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => {
                      setSelectedBudget((prev) => (prev === val ? "" : val));
                      scrollToCatalogue();
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 02 / Catalogue & Filters */}
      <section className="catalogue shell" id="catalogue" aria-label="Catalogue results">
        {/* Desktop Sidebar */}
        <aside className="filter-sidebar" aria-labelledby="filters-title">
          <div className="sidebar-head">
            <div>
              <p className="eyebrow">02 / REFINE RESULTS</p>
              <h2 id="filters-title">Filters</h2>
            </div>
            <button type="button" onClick={clearAll} className="text-button">
              Clear all
            </button>
          </div>
          <div className="filter-controls">
            {renderFilterControls("desktop-budget")}
          </div>
        </aside>

        {/* Results Area */}
        <div className="results-area">
          <div className="results-toolbar">
            <div>
              <p className="results-kicker">CURRENT COLLECTION</p>
              <h2>Explore Available Laptops</h2>
              <p id="result-count" role="status" aria-live="polite">
                Showing {filteredProducts.length} of {products.length} sample laptops
              </p>
            </div>
            <div className="desktop-sort">
              <label htmlFor="sort-desktop">Sort by</label>
              <select
                id="sort-desktop"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Listings</option>
              </select>
            </div>
          </div>

          {/* Mobile Toolbar */}
          <div className="mobile-toolbar">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="toolbar-button"
              aria-haspopup="dialog"
            >
              Filters{" "}
              {activeFilterCount > 0 && (
                <span id="mobile-filter-count">({activeFilterCount})</span>
              )}
            </button>
            <label className="toolbar-button sort-label">
              Sort{" "}
              <select
                id="sort-mobile"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Listings</option>
              </select>
            </label>
          </div>

          {/* Active Filters Bar */}
          {activeFilterCount > 0 && (
            <div className="active-filters" aria-label="Active filters">
              {selectedBrands.map((b) => (
                <button
                  key={`b-${b}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleBrand(b)}
                >
                  {b} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedWarranties.map((w) => (
                <button
                  key={`w-${w}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleWarranty(w)}
                >
                  {w} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedProcessors.map((proc) => (
                <button
                  key={`pr-${proc}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleProcessor(proc)}
                >
                  {proc} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedRam.map((r) => (
                <button
                  key={`r-${r}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleRam(r)}
                >
                  {r} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedStorage.map((st) => (
                <button
                  key={`st-${st}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleStorage(st)}
                >
                  {st} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedScreens.map((sc) => (
                <button
                  key={`sc-${sc}`}
                  type="button"
                  className="active-filter"
                  onClick={() => toggleScreen(sc)}
                >
                  {sc} <span aria-hidden="true">×</span>
                </button>
              ))}
              {selectedBudget && (
                <button
                  type="button"
                  className="active-filter"
                  onClick={() => setSelectedBudget("")}
                >
                  {BUDGET_OPTIONS.find(([val]) => val === selectedBudget)?.[1] || selectedBudget}{" "}
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          )}

          {/* Sample Note */}
          <div className="sample-note">
            <span aria-hidden="true">ⓘ</span> Example listings for layout review. Confirm
            product photos, prices, warranty and availability from the inventory system before
            publishing.
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div id="product-grid" className="product-grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div id="empty-state" className="empty-state">
              <div aria-hidden="true">⌕</div>
              <h3>No laptops match these filters</h3>
              <p>Try another brand, budget or specification.</p>
              <button type="button" onClick={clearAll} className="button primary">
                Clear filters <span aria-hidden="true">↗</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Section Visit CTA */}
      <section className="visit-cta">
        <div className="shell visit-inner">
          <div>
            <p className="eyebrow">NEED HELP CHOOSING?</p>
            <h2>Compare Online. Inspect In-Store.</h2>
            <p>
              Ask the Kandivali West team about the exact configuration, current availability
              and warranty before you visit.
            </p>
          </div>
          <div className="visit-actions">
            <Link className="button white" href="/virajit-laptop-store-kandivali-west">
              Visit Our Store <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="button dark-outline"
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20please%20help%20me%20choose%20a%20refurbished%20laptop."
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            id="drawer-backdrop"
            className="drawer-backdrop"
            onClick={() => setIsDrawerOpen(false)}
          />
          <section
            id="filter-drawer"
            className="filter-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <div className="drawer-head">
              <h2 id="drawer-title">Filter Laptops</h2>
              <button
                type="button"
                id="close-filters"
                aria-label="Close filters"
                onClick={() => setIsDrawerOpen(false)}
              >
                ×
              </button>
            </div>
            <div id="mobile-filter-controls" className="filter-controls drawer-content">
              {renderFilterControls("mobile-budget")}
            </div>
            <div className="drawer-actions">
              <button type="button" onClick={clearAll} className="button outline">
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="button primary"
              >
                Apply Filters
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export const CatalogueBrowser: React.FC<CatalogueBrowserProps> = (props) => {
  return (
    <React.Suspense fallback={<div className="shell py-24 text-center">Loading catalogue...</div>}>
      <CatalogueBrowserContent {...props} />
    </React.Suspense>
  );
};
