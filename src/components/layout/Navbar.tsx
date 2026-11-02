"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { label: "Refurbished Laptops", href: "/#shop" },
    { label: "Laptop Repair", href: "/laptop-repair-store-in-mumbai" },
    { label: "Laptop on Rent", href: "/laptop-on-rent-mumbai" },
    { label: "Laptop Brands", href: "/laptop-brands" },
    { label: "Visit Store", href: "/virajit-laptop-store-kandivali-west" },
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        {/* Brand */}
        <Link className="brand" href="/" aria-label="Viraj IT home">
          <span className="brand-symbol" aria-hidden="true">
            V<span>·</span>
          </span>
          <span>
            VIRAJ<span className="brand-pink">INFOTECH</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isCurrent =
              pathname === link.href ||
              (link.href === "/#shop" && (pathname === "/" || pathname === "/refurbished-laptops-catalogue"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={isCurrent ? "current" : ""}
                aria-current={isCurrent ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header CTA */}
        <a className="header-cta" href="tel:+918928715729">
          Call Store <span aria-hidden="true">↗</span>
        </a>

        {/* Mobile Menu */}
        <details className="mobile-menu">
          <summary aria-label="Open navigation">
            Menu <span aria-hidden="true">☰</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
};
