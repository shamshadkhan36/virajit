"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEnquiryModal } from "@/context/EnquiryModalContext";

interface LaptopItem {
  id: string;
  image: string;
  title: string;
  bubbles: string[];
  currentPrice: string;
  originalPrice: string;
  discount: string;
  category: "under-25k" | "25k-40k" | "above-40k";
}

const LAPTOPS: LaptopItem[] = [
  {
    id: "dell-7480",
    image: "/customer-photos/ref-laptop-card-ref.png",
    title: 'Refurbished DELL Latitude 7480 | Intel Core i5 6th Gen | 14" FHD',
    bubbles: ["Intel Core i5 6th Gen", "8GB RAM", "256GB SSD"],
    currentPrice: "₹ 42,999",
    originalPrice: "₹ 79,999",
    discount: "46% off",
    category: "above-40k",
  },
  {
    id: "dell-5440",
    image: "/customer-photos/ref-laptop-card-ref.png",
    title: 'Dell Latitude 5440 | Intel i3 13th Gen | 14" FHD',
    bubbles: ["Intel Core i3 13th Gen", "16GB RAM", "512GB SSD"],
    currentPrice: "₹ 42,999",
    originalPrice: "₹ 79,999",
    discount: "46% off",
    category: "above-40k",
  },
  {
    id: "lenovo-t480",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=500&q=80",
    title: 'Refurbished Lenovo ThinkPad T480 | Intel Core i5 8th Gen | 14" FHD',
    bubbles: ["Intel Core i5 8th Gen", "16GB RAM", "512GB SSD"],
    currentPrice: "₹ 24,999",
    originalPrice: "₹ 55,000",
    discount: "54% off",
    category: "under-25k",
  },
  {
    id: "hp-840-g5",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=500&q=80",
    title: 'Refurbished HP EliteBook 840 G5 | Intel Core i5 8th Gen | 14" FHD',
    bubbles: ["Intel Core i5 8th Gen", "16GB RAM", "256GB SSD"],
    currentPrice: "₹ 23,499",
    originalPrice: "₹ 52,000",
    discount: "55% off",
    category: "under-25k",
  },
  {
    id: "dell-7490",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=500&q=80",
    title: 'Refurbished DELL Latitude 7490 | Intel Core i7 8th Gen | 14" FHD',
    bubbles: ["Intel Core i7 8th Gen", "16GB RAM", "512GB SSD"],
    currentPrice: "₹ 27,999",
    originalPrice: "₹ 65,000",
    discount: "57% off",
    category: "25k-40k",
  },
  {
    id: "lenovo-x1c6",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
    title: 'Lenovo ThinkPad X1 Carbon Gen 6 | Intel Core i7 | 14" FHD',
    bubbles: ["Intel Core i7 8th Gen", "16GB RAM", "512GB SSD"],
    currentPrice: "₹ 34,999",
    originalPrice: "₹ 85,000",
    discount: "59% off",
    category: "25k-40k",
  },
  {
    id: "hp-440-g8",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80",
    title: 'Refurbished HP ProBook 440 G8 | Intel Core i5 11th Gen | 14" FHD',
    bubbles: ["Intel Core i5 11th Gen", "16GB RAM", "512GB SSD"],
    currentPrice: "₹ 36,999",
    originalPrice: "₹ 72,000",
    discount: "49% off",
    category: "25k-40k",
  },
  {
    id: "dell-3530",
    image: "https://images.unsplash.com/photo-1588797384632-ca1132731a33?auto=format&fit=crop&w=500&q=80",
    title: 'Dell Precision 3530 Workstation | Intel Core i7 | 15.6" FHD',
    bubbles: ["Intel Core i7 8th Gen", "32GB RAM", "512GB SSD"],
    currentPrice: "₹ 44,999",
    originalPrice: "₹ 95,000",
    discount: "53% off",
    category: "above-40k",
  },
];

const REVIEWS = [
  {
    name: "Praful Kothari",
    avatar: "/reviews/praful.png",
    meta: "Local Guide · 21 reviews · 1 week ago",
    text: "“Great experience here. My laptop had a power issue, but they repaired it within the same day. Fast turnaround time and very professional service. The team diagnosed the issue quickly and fixed it at a very reasonable price. Highly recommended!”",
  },
  {
    name: "Ram Manohar",
    avatar: "/reviews/ram.png",
    meta: "5 weeks ago",
    text: "“I recently got my laptop repaired at Virajit Mumbai in Kandivali, and I had a very good experience. The staff was professional, polite, and explained the issue clearly. The repair was done properly and my laptop is working perfectly now.”",
  },
  {
    name: "Kalpana",
    avatar: "/reviews/kalpana.png",
    meta: "1 week ago",
    text: "“Excellent long-term laptop rental service from Viraj Infotech! Reliable performance, instant deposit return, highly trustworthy. The machine was clean, fast, and exactly matched my specifications. Thanks to Vatsal sir for smooth support!”",
  },
  {
    name: "Sameer Duseja",
    avatar: "/reviews/sameer.png",
    meta: "6 reviews · 1 week ago",
    text: "“Very efficient service and at a very reasonable price. Mr Vatsal Shah is very knowledgeable and helpful. He put in great efforts to fix my system and at a fair price. I am fully satisfied with VirajIT.”",
  },
  {
    name: "Raghavendra Patil",
    avatar: "/reviews/raghavendra.png",
    meta: "2 reviews · 5 weeks ago",
    text: "“Best service no doubt reasonably priced. I came for Asus laptop regarding battery, SSD upgrade, fabrication, adapter - all things and service are excellent. Will definitely recommend 👍”",
  },
  {
    name: "Keshav Lad",
    avatar: "/reviews/keshav.png",
    meta: "2 reviews · Recent",
    text: "“We bought all hardware from Viraj Infotech for our school KES International. They keep all products ready and service is very fast. Highly recommended for laptops and accessories!”",
  },
];

const HANDOVERS = [
  {
    image: "/customer-photos/customer-1-3yr-warranty.jpeg",
    caption: "Customer with 3-Year Warranty Laptop",
    alt: "Customer purchased Refurbished Laptop with 3 Years Warranty from VirajIT Kandivali",
  },
  {
    image: "/customer-photos/customer-2-handover.jpeg",
    caption: "Happy Customer Handover at Store",
    alt: "Customer with Refurbished Laptop at VirajIT Mumbai",
  },
  {
    image: "/customer-photos/customer-3-from-virar.jpeg",
    caption: "Customer Travelled from Virar",
    alt: "Customer travelled from Virar for Refurbished Laptop at VirajIT Kandivali",
  },
  {
    image: "/customer-photos/customer-4-student.jpeg",
    caption: "Student Laptop Delivery at Store",
    alt: "Student receiving laptop at VirajIT",
  },
];

export default function HomePage() {
  const { openEnquiryModal } = useEnquiryModal();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredLaptops =
    activeFilter === "all"
      ? LAPTOPS
      : LAPTOPS.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="home-hero shell" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line"></span>Refurbished Laptops in Kandivali West
          </p>
          <h1 id="home-title">
            Laptop First-Class.<br />
            <em>Price Budget-Wala.</em>
          </h1>
          <p className="lead">
            Professionally tested refurbished laptops for work, study and business. Explore top quality laptops with up to 3 years warranty, reliable chip-level repair services and personalised assistance at our Kandivali West store.
          </p>
          <div className="actions">
            <a className="button primary" href="#shop">
              Shop Refurbished Laptops <span aria-hidden="true">↗</span>
            </a>
            <Link className="button outline" href="/laptop-repair-store-in-mumbai">
              Laptop Repair Services <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="hero-trust">
            Visit &amp; test in-store <span>·</span> 3 Years Warranty Available <span>·</span> Local team in Kandivali West
          </p>
        </div>
        <div className="home-hero-art" role="img" aria-label="Refurbished Laptop Store banner">
          <Image
            src="/customer-photos/Home page banner image _ laptop.png"
            alt="Viraj IT Refurbished Laptop Store Kandivali West"
            width={720}
            height={500}
            priority
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SECTION 2: WHAT WE OFFER */}
      <section className="section shell" id="offer" aria-labelledby="offer-title">
        <div className="section-heading narrow">
          <p className="eyebrow">01 / WHAT WE OFFER</p>
          <h2 id="offer-title">Your Laptop Needs, Covered.</h2>
          <p>
            Looking to buy a certified refurbished laptop, get an existing one repaired, or explore new multi-brand laptops and printers? Find the right solution at Viraj IT.
          </p>
        </div>
        <div className="offer-grid">
          {/* Card 1: Refurbished Laptops */}
          <article className="offer-card">
            <div className="offer-visual refurbished">
              <span className="visual-badge">CERTIFIED REFURBISHED</span>
              <Image
                src="/customer-photos/Copy of Customer purchased Refurbished Laptop with 3 Years Warranty from VirajIT Kandivali.jpeg"
                alt="Certified refurbished laptops at Viraj IT"
                width={400}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="offer-body">
              <h3>Refurbished Laptops</h3>
              <p>
                Professionally tested laptops for work, study and coding, with warranty coverage and unbeatable prices.
              </p>
              <a href="#shop">
                Shop Laptops <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          {/* Card 2: Laptop Repair */}
          <article className="offer-card">
            <div className="offer-visual repair">
              <span className="visual-badge">CHIP-LEVEL REPAIR</span>
              <Image
                src="/customer-photos/homepage_laptop repair_ sub section.png"
                alt="Laptop repair technician at Viraj IT"
                width={400}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="offer-body">
              <h3>Laptop Repair &amp; Upgrades</h3>
              <p>
                Startup issues, motherboard diagnosis, screen/hinge repair, and same-day SSD or RAM upgrades.
              </p>
              <Link href="/laptop-repair-store-in-mumbai">
                Explore Repair Services <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

          {/* Card 3: Multi-Brand New */}
          <article className="offer-card">
            <div className="offer-visual brands">
              <span className="visual-badge">AUTHORISED PARTNER</span>
              <Image
                src="/customer-photos/homepage_laptop & printer_sub section.png"
                alt="New multi-brand laptops and printers"
                width={400}
                height={220}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="offer-body">
              <h3>New Laptops &amp; Printers</h3>
              <p>
                Official dealer and authorised partner for Dell, Acer, MSI gaming laptops, and Epson ink tank printers.
              </p>
              <Link href="/laptop-brands">
                Explore Brands <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 3: SHOP BY BUDGET & 8 REFURBISHED LAPTOPS */}
      <section className="shop-section" id="shop" aria-labelledby="shop-title">
        <div className="shell">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">02 / QUALITY LAPTOPS. SMARTER BUDGETS.</p>
              <h2 id="shop-title">Find Your Next Refurbished Laptop</h2>
            </div>
            <p>
              Explore professionally tested Grade-A refurbished business laptops with warranty, pre-loaded Windows, and original adapters.
            </p>
          </div>

          <div className="budget-grid" aria-label="Shop by budget">
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter(activeFilter === "under-25k" ? "all" : "under-25k");
              }}
              style={activeFilter === "under-25k" ? { borderColor: "#b30c7a", background: "#fff6fb" } : {}}
            >
              <span>01 / SHOP BY BUDGET</span>
              <strong>Under ₹25,000</strong>
              <small>{activeFilter === "under-25k" ? "Showing Under ₹25k (Click to reset)" : "Explore laptops ↗"}</small>
            </a>
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter(activeFilter === "25k-40k" ? "all" : "25k-40k");
              }}
              style={activeFilter === "25k-40k" ? { borderColor: "#b30c7a", background: "#fff6fb" } : {}}
            >
              <span>02 / SHOP BY BUDGET</span>
              <strong>₹25,000 – ₹40,000</strong>
              <small>{activeFilter === "25k-40k" ? "Showing ₹25k-₹40k (Click to reset)" : "Explore laptops ↗"}</small>
            </a>
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter(activeFilter === "above-40k" ? "all" : "above-40k");
              }}
              style={activeFilter === "above-40k" ? { borderColor: "#b30c7a", background: "#fff6fb" } : {}}
            >
              <span>03 / SHOP BY BUDGET</span>
              <strong>Above ₹40,000</strong>
              <small>{activeFilter === "above-40k" ? "Showing Above ₹40k (Click to reset)" : "Explore laptops ↗"}</small>
            </a>
          </div>

          <div className="products-heading">
            <div>
              <p className="eyebrow">CURRENTLY AVAILABLE</p>
              <h3>Popular Refurbished Laptops</h3>
            </div>
            <Link className="text-cta" href="/refurbished-laptops-catalogue">
              View Full Live Catalogue <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* 8 LAPTOPS: 4 PER ROW x 2 ROWS (STRICT FORMAT PER INSTRUCTION) */}
          <div className="refurbished-catalog-grid">
            {filteredLaptops.map((laptop) => (
              <article key={laptop.id} className="laptop-card">
                <div className="laptop-card-image">
                  <Image
                    src={laptop.image}
                    alt={laptop.title}
                    width={320}
                    height={190}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="laptop-card-title">{laptop.title}</div>
                <div className="laptop-card-bubbles">
                  {laptop.bubbles.map((b, idx) => (
                    <span key={idx} className="spec-bubble">
                      {b}
                    </span>
                  ))}
                </div>
                <div className="laptop-card-price-row">
                  <span className="price-current">{laptop.currentPrice}</span>
                  <span className="price-original">{laptop.originalPrice}</span>
                  <span className="price-discount">{laptop.discount}</span>
                </div>
                <div className="laptop-card-warranty">
                  <span aria-hidden="true">✓</span> Warranty Included
                </div>
                <button
                  type="button"
                  className="laptop-card-btn"
                  onClick={() =>
                    openEnquiryModal({
                      productName: `${laptop.title} (${laptop.currentPrice})`,
                    })
                  }
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LAPTOP REPAIR SERVICES */}
      <section className="section shell repair-section" id="repair" aria-labelledby="repair-title">
        <div className="repair-photo" role="img" aria-label="Viraj IT Laptop Repair Technician">
          <Image
            src="/customer-photos/homepage-laptop repair vertical image.png"
            alt="Viraj IT expert technician diagnosing laptop motherboard"
            width={520}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="repair-copy">
          <p className="eyebrow">03 / LAPTOP REPAIR SERVICES</p>
          <h2 id="repair-title">Laptop Giving You Trouble?</h2>
          <p>
            Laptop not turning on, overheating, shutting down or running sluggish? Our in-house certified technicians perform thorough chip-level diagnostics and same-day repairs.
          </p>
          <div className="repair-list">
            <div>
              <strong>Laptop Not Starting</strong>
              <span>Power failures, blue-screen errors, and motherboard repair.</span>
            </div>
            <div>
              <strong>Screen &amp; Hinge Repair</strong>
              <span>Broken displays, cracked bezels, and loose hinges.</span>
            </div>
            <div>
              <strong>Battery &amp; Charging Issues</strong>
              <span>Original replacement batteries, adapters, and DC jack repair.</span>
            </div>
            <div>
              <strong>Slow Laptop &amp; Overheating</strong>
              <span>Thermal paste servicing, fan repair, SSD &amp; RAM speed upgrades.</span>
            </div>
          </div>
          <div className="actions">
            <a
              className="button primary"
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20get%20my%20laptop%20checked.%20Please%20guide%20me%20on%20the%20next%20step."
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Your Laptop Checked <span aria-hidden="true">↗</span>
            </a>
            <Link className="button outline" href="/laptop-repair-store-in-mumbai">
              View Repair Services <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: RENTAL SERVICES */}
      <section className="rental-section" id="rent" aria-labelledby="rent-title">
        <div className="shell rental-inner">
          <div>
            <p className="eyebrow">04 / LAPTOP RENTAL SERVICES</p>
            <h2 id="rent-title">Need Laptops on Rent?</h2>
            <p>
              Explore flexible laptop rental options for startups, corporate teams, student training batches, and temporary events. Get pre-configured Intel Core i5/i7 machines with instant support.
            </p>
            <Link className="button primary" href="/laptop-on-rent-mumbai">
              Enquire About Laptop Rentals <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="rental-visual" role="img" aria-label="Business laptops on rent">
            <Image
              src="/rental/rental-hero.webp"
              alt="Laptops on Rent in Mumbai"
              width={540}
              height={360}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: BRAND ASSOCIATION & PARTNERSHIPS */}
      <section className="section shell brand-section" id="brands" aria-labelledby="brand-title">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">05 / LEADING TECHNOLOGY BRANDS</p>
            <h2 id="brand-title">Trusted Brands. One Local Store.</h2>
          </div>
          <p>
            Official dealer and authorised partner for leading laptop and printer brands. Buy brand new devices with official manufacturer warranty in Kandivali West.
          </p>
        </div>

        <div className="logo-grid">
          {/* DELL */}
          <div>
            <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text
                x="50%"
                y="36"
                fontFamily="'Space Grotesk', Arial, sans-serif"
                fontWeight="900"
                fontSize="36"
                fill="#0076CE"
                textAnchor="middle"
                letterSpacing="-0.03em"
              >
                DELL
              </text>
            </svg>
            <span>Authorised Loyalty Partner</span>
          </div>
          {/* ACER */}
          <div>
            <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text
                x="50%"
                y="36"
                fontFamily="'Space Grotesk', Arial, sans-serif"
                fontWeight="800"
                fontSize="36"
                fill="#83B81A"
                textAnchor="middle"
                letterSpacing="-0.02em"
              >
                acer
              </text>
            </svg>
            <span>Authorised Laptop Dealer</span>
          </div>
          {/* MSI */}
          <div>
            <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(24, 6)">
                <path d="M12 2C6 5 2 12 2 18C2 28 12 36 12 36C12 36 22 28 22 18C22 12 18 5 12 2Z" fill="#ED1C24" />
                <text
                  x="64"
                  y="27"
                  fontFamily="'Space Grotesk', Arial, sans-serif"
                  fontWeight="900"
                  fontStyle="italic"
                  fontSize="32"
                  fill="#111"
                  textAnchor="middle"
                >
                  msi
                </text>
              </g>
            </svg>
            <span>Authorised Royal Partner</span>
          </div>
          {/* EPSON */}
          <div>
            <svg viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text
                x="50%"
                y="36"
                fontFamily="'Space Grotesk', Arial, sans-serif"
                fontWeight="900"
                fontSize="34"
                fill="#003399"
                textAnchor="middle"
                letterSpacing="-0.01em"
              >
                EPSON
              </text>
            </svg>
            <span>Certified Channel Partner</span>
          </div>
        </div>
        <p className="brand-note">
          Official dealer and authorised partner for leading laptop and printer brands.
        </p>
        <Link className="text-cta" href="/laptop-brands">
          Explore Laptop &amp; Printer Brands <span aria-hidden="true">↗</span>
        </Link>
      </section>

      {/* SECTION 7: THE VIRAJ IT ADVANTAGE */}
      <section className="trust-section" id="trust" aria-labelledby="trust-title">
        <div className="shell">
          <div className="section-heading narrow">
            <p className="eyebrow">06 / THE VIRAJ IT ADVANTAGE</p>
            <h2 id="trust-title">More Than Just a Laptop Store</h2>
            <p>
              From choosing a laptop to getting help after your purchase, Viraj IT combines product options with the convenience of a local store.
            </p>
          </div>
          <div className="trust-grid">
            <div>
              <span>01</span>
              <h3>Visit &amp; Test In-Store</h3>
              <p>Explore available laptops in person before deciding.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Brand Associations</h3>
              <p>Official dealer and authorised partner for leading laptop and printer brands.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Experienced Technical Team</h3>
              <p>Ask for practical help with diagnosis, repairs and upgrades.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Local After-Sales Assistance</h3>
              <p>Contact the Kandivali West team when you need support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: REAL CUSTOMER REVIEWS & HANDOVER PHOTOS */}
      <section className="section shell customers-section" id="customers" aria-labelledby="customers-title">
        <div className="section-heading split">
          <div>
            <p className="eyebrow">07 / REAL CUSTOMERS. REAL EXPERIENCES.</p>
            <h2 id="customers-title">Trusted by Customers Across Mumbai</h2>
          </div>
          <p>See what customers have to say about buying laptops and visiting Viraj IT.</p>
        </div>

        <div className="review-module">
          <div className="review-summary">
            <div className="stars-row" aria-label="5 stars rating">
              ★★★★★
            </div>
            <strong>4.9 / 5.0</strong>
            <span>Based on verified Google Reviews</span>
            <a
              className="btn-g-review"
              href="https://g.page/r/Ca3LSSyVus64EAI/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rate Us on Google ↗
            </a>
          </div>

          <div className="review-cards-grid">
            {REVIEWS.map((rev, idx) => (
              <article key={idx} className="review-card">
                <div className="review-card-header">
                  <div className="review-avatar">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      width={44}
                      height={44}
                      className="review-avatar-img"
                    />
                  </div>
                  <div>
                    <div className="review-author">{rev.name}</div>
                    <div className="review-meta">{rev.meta}</div>
                  </div>
                </div>
                <div className="review-stars">★★★★★</div>
                <p>{rev.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* CUSTOMER HANDOVER PHOTOGRAPHS */}
        <div className="handover-row" aria-label="Customer purchase handovers at Viraj IT">
          {HANDOVERS.map((h, idx) => (
            <div key={idx} className="handover-card">
              <Image
                src={h.image}
                alt={h.alt}
                width={300}
                height={375}
                className="w-full h-full object-cover object-top"
              />
              <div className="handover-caption">{h.caption}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "24px" }}>
          <a
            className="text-cta"
            href="https://g.page/r/Ca3LSSyVus64EAI/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read All Reviews on Google Reviews ↗
          </a>
        </div>
      </section>

      {/* SECTION 9: VISIT VIRAJ IT */}
      <section className="visit-section" id="visit" aria-labelledby="visit-title">
        <div className="shell visit-grid">
          <div>
            <p className="eyebrow light">08 / VISIT VIRAJ IT</p>
            <h2 id="visit-title">Your Local Laptop Store in Kandivali West</h2>
            <p>
              Visit Viraj IT to explore available refurbished laptops, buy authorized brand new models, or discuss your laptop repair requirements directly with our technicians.
            </p>

            <div className="visit-detail">
              <span>STORE ADDRESS</span>
              <strong>Viraj IT (Viraj Infotech)</strong>
              <small>
                Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.
              </small>
            </div>

            <div className="visit-detail">
              <span>PHONE &amp; WHATSAPP</span>
              <strong>+91 89287 15729</strong>
            </div>

            <div className="visit-detail">
              <span>STORE TIMINGS</span>
              <small>Mon–Sat: 10:00 AM – 8:30 PM &nbsp;|&nbsp; Sun: 11:00 AM – 6:00 PM</small>
            </div>

            <div className="actions">
              <a
                className="button white"
                href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <span aria-hidden="true">↗</span>
              </a>
              <a className="button dark-outline" href="tel:+918928715729">
                Call Store <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* EMBEDDED GOOGLE MAP */}
          <div className="map-placeholder">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8641568220833!2d72.84362103670237!3d19.201134708472352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7625f004dc9%3A0xb8ceba952c49cbad!2sVirajIT%20Mumbai%20%7C%20Laptop%20Repair%20and%20Refurbished%20Laptop%20Store!5e0!3m2!1sen!2sin!4v1792837979716!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQS */}
      <section className="section faq shell" id="faq" aria-labelledby="faq-title">
        <div className="section-heading narrow">
          <p className="eyebrow">09 / GOOD TO KNOW</p>
          <h2 id="faq-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Does Viraj IT sell refurbished laptops with a warranty?</summary>
            <p>
              Yes. Every refurbished laptop undergoes rigorous multi-point hardware testing and comes with included warranty (with extended warranty up to 3 years available). Each device includes original charger, bill, and test report.
            </p>
          </details>
          <details>
            <summary>Can I visit the store before buying a laptop?</summary>
            <p>
              Yes! We warmly invite you to visit our store at Kandivali West to test the laptop screen, battery backup, keyboard, and performance in person before deciding.
            </p>
          </details>
          <details>
            <summary>Which new laptop and printer brands are available?</summary>
            <p>
              Viraj IT is an official partner for Dell, Acer, and MSI gaming laptops, as well as Epson ink tank printers. All new products come with official brand warranty.
            </p>
          </details>
          <details>
            <summary>Does Viraj IT repair laptops from different brands?</summary>
            <p>
              Yes. Our in-house engineers diagnose and service laptops from Dell, HP, Lenovo, Asus, Acer, Apple MacBook, and MSI, covering screen replacement, motherboard chip-level repair, battery replacement, and SSD/RAM upgrades.
            </p>
          </details>
          <details>
            <summary>Are laptops available on rent?</summary>
            <p>
              Yes, we provide flexible corporate and personal laptop rentals for projects, teams, learning courses, and events.{" "}
              <Link href="/laptop-on-rent-mumbai">Learn more about our rental options</Link>.
            </p>
          </details>
          <details>
            <summary>How can I check laptop availability or request a repair?</summary>
            <p>
              Call us directly at <a href="tel:+918928715729">+91 89287 15729</a> or{" "}
              <a
                href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20ask%20about%20a%20laptop%20or%20repair."
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp our team
              </a>{" "}
              with your requirement.
            </p>
          </details>
        </div>
      </section>

      {/* Floating WhatsApp Us Button */}
      <a
        className="floating-wa"
        href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20ask%20about%20your%20products%20or%20services."
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp Us ↗
      </a>
    </>
  );
}
