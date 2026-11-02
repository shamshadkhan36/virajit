"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
  const coverImage = cleanImages[0] || defaultImage;

  const inrPrice = Math.round(product.price);
  const origPrice = Math.round(product.originalPrice || product.price * 1.8);
  const discountPct =
    origPrice > inrPrice ? Math.round(((origPrice - inrPrice) / origPrice) * 100) : 48;

  const productHref = `/products/${product.slug || product.id}`;

  const cpuText = product.processor || "Intel Core i5";
  const ramText = product.ram?.includes("RAM") ? product.ram : `${product.ram || "16GB"} RAM`;
  const storageText = product.storage || "512GB SSD";
  const screenText = product.screen || '14"';

  const title = product.name?.startsWith("Refurbished")
    ? product.name
    : `Refurbished ${product.brand?.toUpperCase()} ${product.model} | ${cpuText} | ${screenText}`;

  return (
    <article className="product-card-modern">
      <div className="card-img-wrap">
        <Image
          src={coverImage}
          alt={title}
          width={280}
          height={180}
          className="object-contain max-h-[160px] w-auto transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <Link className="card-title-link" href={productHref}>
        <h3 className="card-title">{title}</h3>
      </Link>
      <div className="card-bubbles">
        <span className="spec-bubble">{cpuText}</span>
        <span className="spec-bubble">{ramText}</span>
        <span className="spec-bubble">{storageText}</span>
      </div>
      <div className="card-price-row">
        <span className="current-price">₹ {inrPrice.toLocaleString("en-IN")}</span>
        <span className="original-price">₹ {origPrice.toLocaleString("en-IN")}</span>
        <span className="discount-tag">{discountPct}% off</span>
      </div>
      <div className="card-warranty-row">
        <span className="warranty-check">✓ Warranty Included</span>
      </div>
      <Link className="card-btn-view-details" href={productHref}>
        View Details
      </Link>
    </article>
  );
};
