"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "@/types";
import { FORMATTED_PRODUCTS } from "@/lib/catalogue-data";
import { ProductCard } from "@/components/store/ProductCard";

const ANGLES = [
  { key: "front", label: "Front view", num: "01" },
  { key: "left", label: "Left side", num: "02" },
  { key: "right", label: "Right side", num: "03" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const initialProd =
    FORMATTED_PRODUCTS.find(
      (p) =>
        p.slug === slug ||
        p.id === slug ||
        p.id === `prod-${slug}` ||
        (slug && p.slug?.includes(slug)) ||
        (slug && slug.includes(p.id?.replace("prod-", "")))
    ) || null;
  const [product, setProduct] = useState<Product | null>(initialProd);
  const [allProducts, setAllProducts] = useState<Product[]>(FORMATTED_PRODUCTS);
  const [angleIndex, setAngleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(!initialProd);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.product) {
            setProduct(data.product);
          }
        }

        const allRes = await fetch("/api/products");
        if (allRes.ok) {
          const allData = await allRes.json();
          if (allData.success && Array.isArray(allData.products) && allData.products.length > 0) {
            setAllProducts(allData.products);
          }
        }
      } catch (err) {
        // Fallback
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) loadProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="shell py-24 text-center">
        <h2>Loading laptop details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="shell not-found">
        <h1>Product not found</h1>
        <p>This sample laptop is not in the wireframe catalogue.</p>
        <Link className="button primary" href="/refurbished-laptops-catalogue">
          Back to laptops ↗
        </Link>
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }
  const cleanImages = (Array.isArray(images) ? images : []).filter(
    (img) => typeof img === "string" && !img.includes("1544716278")
  );
  const defaultImage = "/customer-photos/ref-laptop-card-ref.png";
  while (cleanImages.length < 3) {
    cleanImages.push(defaultImage);
  }

  const name = `${product.brand} ${product.model}`;
  const price = Math.round(product.price);
  const origPrice = Math.round(product.originalPrice || product.price * 1.8);
  const warranty = product.warrantyDuration || product.warrantyText || "6 Months";

  const waText = `Hi Viraj IT, please confirm the exact-unit photos, current price, condition, availability and warranty for the ${name} (${product.processor}, ${product.ram}, ${product.storage}).`;
  const waUrl = `https://wa.me/918928715729?text=${encodeURIComponent(waText)}`;

  const similar = allProducts
    .filter((p) => p.id !== product.id && p.slug !== product.slug)
    .slice(0, 3);

  const activeAngle = ANGLES[angleIndex];
  const activeImage = cleanImages[angleIndex] || cleanImages[0] || defaultImage;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to product
      </a>

      <div className="preview-ribbon">
        PRODUCT DETAIL WIREFRAME{" "}
        <span>Sample product data and photo slots · approve exact-unit details before publication</span>
      </div>

      <main id="main">
        {/* Breadcrumb */}
        <div className="shell breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/refurbished-laptops-catalogue">Refurbished Laptops</Link>
          <span aria-hidden="true">/</span>
          <span>{name}</span>
        </div>

        {/* Note */}
        <div className="shell sample-detail-note">
          ⓘ Wireframe sample: specifications, price, warranty and availability below are illustrative.
          Replace with approved records and photographs of this exact laptop before publication.
        </div>

        {/* Product Top */}
        <section className="shell product-top" aria-labelledby="product-title">
          {/* Gallery Column */}
          <div className="gallery-column">
            <div className="photo-stage" id="photo-stage" aria-live="polite">
              <span className="stage-label">
                {activeAngle.label.toUpperCase()} · ACTUAL UNIT PHOTO
              </span>
              <Image
                src={activeImage}
                alt={`${name}, ${activeAngle.label}`}
                width={500}
                height={380}
                className="stage-image object-contain"
                priority
              />
              <span className="photo-hint">
                ✓ Reference unit photograph · Exact unit available in Kandivali store
              </span>
              <span className="stage-count">
                {angleIndex + 1} / 3
              </span>
            </div>

            <div className="gallery-controls" role="group" aria-label="Laptop photo angles">
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Previous photo"
                onClick={() => setAngleIndex((prev) => (prev === 0 ? ANGLES.length - 1 : prev - 1))}
              >
                ‹
              </button>
              {ANGLES.map((ang, i) => (
                <button
                  key={ang.key}
                  type="button"
                  className="thumb"
                  aria-pressed={i === angleIndex}
                  onClick={() => setAngleIndex(i)}
                >
                  <span className="thumb-art" aria-hidden="true">
                    {ang.num}
                  </span>
                  <span>
                    <strong>{ang.label}</strong>
                    <small>View photo</small>
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Next photo"
                onClick={() => setAngleIndex((prev) => (prev === ANGLES.length - 1 ? 0 : prev + 1))}
              >
                ›
              </button>
            </div>
            <p className="gallery-caption">
              Provide three photographs of the same unit: front, left side and right side. Show
              actual ports and visible wear clearly.
            </p>
          </div>

          {/* Summary Column */}
          <div className="summary-column">
            <p className="product-eyebrow">REFURBISHED LAPTOP · SAMPLE LISTING</p>
            <h1 id="product-title">{name}</h1>
            <p className="summary-subtitle">
              {product.processor} · {product.ram} RAM · {product.storage}
            </p>

            <div className="product-ref">
              <span>SKU: {product.id?.toUpperCase()}</span>
              <span>Exact unit condition: Tested Grade A+</span>
            </div>

            <div className="summary-price">
              <div>
                <small>Sample selling price</small>
                <strong>₹ {price.toLocaleString("en-IN")}</strong>
              </div>
              <span className={`summary-stock ${product.stock > 0 ? "" : "limited"}`}>
                ● {product.stock > 0 ? "In stock" : "Limited stock"}
              </span>
            </div>

            <div className="warranty-line">
              <b aria-hidden="true">◇</b>
              <span>{warranty} warranty shown for this sample listing · confirm final terms</span>
            </div>

            <div className="at-glance">
              <h2>At a Glance</h2>
              <dl>
                <div>
                  <dt>Processor</dt>
                  <dd>{product.processor}</dd>
                </div>
                <div>
                  <dt>RAM</dt>
                  <dd>{product.ram}</dd>
                </div>
                <div>
                  <dt>Storage</dt>
                  <dd>{product.storage}</dd>
                </div>
                <div>
                  <dt>Screen</dt>
                  <dd>{product.screen || '14" FHD'}</dd>
                </div>
              </dl>
            </div>

            <div className="summary-actions">
              <a
                className="button primary"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Confirm on WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <Link className="button outline" href="/virajit-laptop-store-kandivali-west">
                Visit Store <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="availability-note">
              Ask the team to confirm this exact configuration and current availability before
              visiting.
            </p>
          </div>
        </section>

        {/* Page Section Nav */}
        <nav className="shell detail-nav" aria-label="On this page">
          <a href="#about">Product description</a>
          <a href="#specifications">Specifications</a>
          <a href="#condition">Condition &amp; warranty</a>
          <a href="#related">Similar laptops</a>
        </nav>

        {/* Section 01: Product Overview */}
        <section
          className="shell detail-section description-layout"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="description-copy">
            <p className="section-label">01 / PRODUCT OVERVIEW</p>
            <h2 id="about-title">About the {name}</h2>
            <p>
              This sample {name} listing pairs an {product.processor} processor with {product.ram}{" "}
              of RAM and {product.storage}. Its {product.screen || '14"'} screen places it among the
              options customers may consider for everyday computing. The right choice depends on the
              work you plan to do, the final condition of the individual laptop and the accessories
              supplied with it.
            </p>
            <p>
              Use this space for a clear, original description of the exact configuration offered by
              Viraj IT. Explain what distinguishes this unit from another {product.model} with
              different memory, storage, screen or physical condition. A buyer should not have to
              infer these differences from the model name alone.
            </p>
            <h3>Who may find this configuration useful?</h3>
            <p>
              Describe the practical tasks this laptop supports, such as document work,
              browser-based tools, online meetings or study, only after the team has checked the
              unit&apos;s actual performance. State any relevant limits plainly. If a customer needs
              specialised software, heavy editing or gaming, invite them to confirm suitability with
              the store before purchase.
            </p>
            <h3>What should buyers verify on this exact unit?</h3>
            <p>
              Record the tested battery condition, display resolution, keyboard layout, ports,
              webcam, operating system, cosmetic marks and included charger. These details can vary
              between refurbished units even when the model number matches. The three-angle gallery
              above should show the actual laptop being sold and make visible wear easy to assess.
            </p>
            <h3>Buying from the Kandivali West store</h3>
            <p>
              Customers can contact Viraj IT to confirm current availability, ask about the warranty
              terms and arrange to inspect a suitable laptop at the Kandivali West store. Keep this
              description current when the unit is sold or replaced by a different configuration.
            </p>
          </div>

          <aside className="editor-card">
            <p className="section-label">BUYER CHECKLIST</p>
            <h3>Know the exact unit before you decide.</h3>
            <p>For a refurbished laptop, the model name is only the starting point. Ask about:</p>
            <ul>
              <li>Physical condition and visible marks</li>
              <li>Battery health and charger</li>
              <li>Operating system and ports</li>
              <li>Warranty coverage and exclusions</li>
            </ul>
          </aside>
        </section>

        {/* Section 02: Specifications */}
        <section className="specs-section" id="specifications" aria-labelledby="specs-title">
          <div className="shell detail-section specs-layout">
            <div>
              <p className="section-label">02 / TECHNICAL DETAILS</p>
              <h2 id="specs-title">Specifications</h2>
              <p className="summary-subtitle">
                Confirm every field against the physical unit before publishing.
              </p>
            </div>
            <div className="specs-table">
              <div className="specs-row">
                <span>Brand &amp; model</span>
                <strong>{name}</strong>
              </div>
              <div className="specs-row">
                <span>Processor</span>
                <strong>{product.processor}</strong>
              </div>
              <div className="specs-row">
                <span>RAM</span>
                <strong>{product.ram}</strong>
              </div>
              <div className="specs-row">
                <span>Storage</span>
                <strong>{product.storage}</strong>
              </div>
              <div className="specs-row">
                <span>Display size</span>
                <strong>{product.screen || '14" FHD'}</strong>
              </div>
              <div className="specs-row">
                <span>Graphics</span>
                <strong>{product.gpu || "Integrated Graphics"}</strong>
              </div>
              <div className="specs-row">
                <span>Touch Screen</span>
                <strong>{product.touchScreen || "No"}</strong>
              </div>
              <div className="specs-row">
                <span>Warranty</span>
                <strong>{warranty}</strong>
              </div>
              <div className="specs-row">
                <span>Included items</span>
                <strong>{product.includedAccessories || "Original Charger, Power Cord, Bag & Mouse"}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Condition & Warranty */}
        <section className="shell detail-section" id="condition" aria-labelledby="condition-title">
          <p className="section-label">03 / EXACT-UNIT ASSURANCE</p>
          <h2 id="condition-title">Condition &amp; Warranty</h2>
          <div className="terms-grid">
            <div className="terms-card">
              <span className="num">01 / CONDITION</span>
              <h3>What the photos should show</h3>
              <p>
                Publish honest front and side views of this exact unit. Add concise notes about wear,
                screen, keyboard and battery after inspection.
              </p>
            </div>
            <div className="terms-card">
              <span className="num">02 / WARRANTY</span>
              <h3>{warranty} sample duration</h3>
              <p>
                Publish the approved warranty start date, coverage, exclusions and claim process for
                this unit. Do not assume terms from another seller.
              </p>
            </div>
            <div className="terms-card">
              <span className="num">03 / INCLUDED ITEMS</span>
              <h3>Confirm what comes with it</h3>
              <p>
                List the charger, any accessories and the operating system only after checking the
                actual package prepared for the customer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Similar Laptops */}
        <section className="related-section" id="related" aria-labelledby="related-title">
          <div className="shell detail-section">
            <div className="related-heading">
              <div>
                <p className="section-label">04 / KEEP EXPLORING</p>
                <h2 id="related-title">Similar Laptops to Compare</h2>
              </div>
              <Link href="/refurbished-laptops-catalogue">Back to all results ↗</Link>
            </div>
            <div className="product-grid">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="browse-links">
              <Link href={`/refurbished-laptops-catalogue?brand=${product.brand}`}>
                More {product.brand} laptops ↗
              </Link>
              <Link href="/refurbished-laptops-catalogue">
                Browse all refurbished laptops ↗
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
