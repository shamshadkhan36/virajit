"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
        {/* Real Viraj Infotech Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0 py-1" aria-label="Viraj Infotech">
          <div className="relative h-12 w-40 sm:w-52 flex items-center transition-transform group-hover:scale-[1.02]">
            <Image
              src="/viraj-infotech-logo.png"
              alt="Viraj Infotech"
              width={280}
              height={98}
              priority
              className="w-full h-full object-contain object-left"
            />
          </div>
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
