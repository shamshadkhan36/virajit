"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand" href="/" aria-label="Viraj IT home">
            <span className="brand-symbol" aria-hidden="true">
              V<span>·</span>
            </span>
            <span>
              VIRAJ<span className="brand-pink">INFOTECH</span>
            </span>
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
