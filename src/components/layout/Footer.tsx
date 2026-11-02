"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          {/* Real Viraj Infotech Brand Logo */}
          <Link href="/" className="inline-flex items-center group mb-4" aria-label="Viraj Infotech">
            <div className="relative h-11 w-40 sm:w-48 flex items-center transition-transform group-hover:scale-[1.02]">
              <Image
                src="/viraj-infotech-logo.png"
                alt="Viraj Infotech"
                width={260}
                height={90}
                className="w-full h-full object-contain object-left"
              />
            </div>
          </Link>
          <p>
            Refurbished laptops, repairs and technology assistance in Kandivali West, Mumbai.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/refurbished-laptops-catalogue">Refurbished Laptops</Link>
          <Link href="/laptop-repair-store-in-mumbai">Laptop Repair</Link>
          <Link href="/virajit-laptop-store-kandivali-west">Visit Store</Link>
        </nav>
        <div>
          <span>Talk to our team</span>
          <a href="tel:+918928715729">+91 89287 15729</a>
          <a
            href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20please%20help%20me%20choose%20a%20refurbished%20laptop."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Viraj IT ↗
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        Viraj Infotech · Kandivali West, Mumbai · All rights reserved
      </div>
    </footer>
  );
};
