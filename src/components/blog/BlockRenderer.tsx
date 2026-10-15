"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageBuilderBlock, Product, BlockStyleSettings } from "@/types";
import { ProductCard } from "@/components/store/ProductCard";
import {
  Sparkles,
  Quote,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Laptop,
  Play,
  Clock,
  TrendingUp,
  Tag,
  Code,
  Layers,
} from "lucide-react";

interface BlockRendererProps {
  blocks: PageBuilderBlock[];
  onProductViewDetails?: (product: Product) => void;
  isEditable?: boolean;
  selectedBlockId?: string | null;
  onSelectBlock?: (blockId: string) => void;
  onInlineUpdate?: (blockId: string, key: string, value: any) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  blocks,
  onProductViewDetails,
  isEditable = false,
  selectedBlockId,
  onSelectBlock,
  onInlineUpdate,
}) => {
  const [embeddedProducts, setEmbeddedProducts] = useState<Record<string, Product>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<Record<string, number | null>>({});

  // Fetch any referenced products in laptop_showcase blocks
  useEffect(() => {
    const productIdsToFetch = blocks
      .filter((b) => b.type === "laptop_showcase" && b.data?.productId)
      .map((b) => b.data.productId);

    if (productIdsToFetch.length > 0) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.products) {
            const map: Record<string, Product> = {};
            data.products.forEach((p: Product) => {
              map[p.id] = p;
            });
            setEmbeddedProducts(map);
          }
        })
        .catch((err) => console.error("Error loading showcase products:", err));
    }
  }, [blocks]);

  const toggleFaq = (blockId: string, index: number) => {
    setOpenFaqIndex((prev) => ({
      ...prev,
      [blockId]: prev[blockId] === index ? null : index,
    }));
  };

  // Helper for applying BlockStyleSettings classes
  const getStyleClasses = (style?: BlockStyleSettings) => {
    if (!style) return "p-6 sm:p-8 rounded-2xl bg-tech-950/80 border border-tech-800";

    const alignClass =
      style.align === "center"
        ? "text-center"
        : style.align === "right"
        ? "text-right"
        : style.align === "justify"
        ? "text-justify"
        : "text-left";

    let bgClass = "bg-tech-950/80 border border-tech-800";
    if (style.bgPreset === "transparent") bgClass = "bg-transparent";
    else if (style.bgPreset === "glass") bgClass = "backdrop-blur-xl bg-tech-900/60 border border-tech-700/60";
    else if (style.bgPreset === "emerald_glow")
      bgClass = "bg-gradient-to-br from-tech-950 via-tech-900 to-brand-950/70 border border-brand-500/40";
    else if (style.bgPreset === "purple_velvet")
      bgClass = "bg-gradient-to-br from-tech-950 via-purple-950/60 to-tech-900 border border-purple-500/40";
    else if (style.bgPreset === "ocean_blue")
      bgClass = "bg-gradient-to-br from-tech-950 via-cyan-950/50 to-blue-950/60 border border-cyan-500/40";
    else if (style.bgPreset === "cyberpunk")
      bgClass = "bg-gradient-to-r from-tech-950 via-slate-900 to-purple-950/80 border border-teal-500/40";
    else if (style.bgPreset === "sunset")
      bgClass = "bg-gradient-to-br from-tech-950 via-amber-950/40 to-orange-950/60 border border-amber-500/40";

    const paddingClass =
      style.padding === "none"
        ? "p-0"
        : style.padding === "compact"
        ? "p-4 sm:p-5"
        : style.padding === "spacious"
        ? "p-8 sm:p-14"
        : "p-6 sm:p-8";

    const radiusClass =
      style.borderRadius === "none"
        ? "rounded-none"
        : style.borderRadius === "md"
        ? "rounded-lg"
        : style.borderRadius === "xl"
        ? "rounded-xl"
        : style.borderRadius === "3xl"
        ? "rounded-3xl"
        : style.borderRadius === "full"
        ? "rounded-full"
        : "rounded-2xl";

    const glowClass =
      style.shadowGlow === "brand_glow"
        ? "shadow-2xl shadow-brand-500/15"
        : style.shadowGlow === "purple_glow"
        ? "shadow-2xl shadow-purple-500/15"
        : style.shadowGlow === "amber_glow"
        ? "shadow-2xl shadow-amber-500/15"
        : style.shadowGlow === "elevated"
        ? "shadow-2xl shadow-black/80"
        : style.shadowGlow === "subtle"
        ? "shadow-md"
        : "";

    return `${alignClass} ${bgClass} ${paddingClass} ${radiusClass} ${glowClass}`;
  };

  return (
    <div className="space-y-10 text-tech-200">
      {blocks.map((block) => {
        const isSelected = isEditable && selectedBlockId === block.id;

        const blockContainerProps = isEditable
          ? {
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                if (onSelectBlock) onSelectBlock(block.id);
              },
              className: `relative transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "ring-2 ring-brand-500 ring-offset-4 ring-offset-tech-950 rounded-2xl shadow-xl"
                  : "hover:ring-1 hover:ring-brand-500/40 rounded-2xl"
              }`,
            }
          : {};

        return (
          <div key={block.id} {...blockContainerProps}>
            {/* Inline selected badge indicator when in builder mode */}
            {isSelected && (
              <div className="absolute -top-3.5 left-4 z-20 px-2.5 py-0.5 rounded-full bg-brand-500 text-tech-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                Active Block: {block.type}
              </div>
            )}

            {/* BLOCK RENDERING ACCORDING TO TYPE */}
            {(() => {
              switch (block.type) {
                case "hero":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="max-w-3xl space-y-4">
                        {block.data.badge && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                            <Sparkles className="w-3.5 h-3.5" />
                            {block.data.badge}
                          </span>
                        )}
                        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                          {block.data.title}
                        </h1>
                        {block.data.subtitle && (
                          <p className="text-base sm:text-lg text-tech-300 leading-relaxed font-light">
                            {block.data.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  );

                case "paragraph":
                  return (
                    <div className={`prose prose-invert max-w-none ${getStyleClasses(block.style)}`}>
                      {block.data.content?.split("\n\n").map((para: string, idx: number) => (
                        <p key={idx} className="text-base sm:text-lg leading-relaxed text-tech-300 mb-4 font-normal">
                          {para}
                        </p>
                      ))}
                    </div>
                  );

                case "heading":
                  return (
                    <div className={`pt-4 border-t border-tech-800/60 ${getStyleClasses(block.style)}`}>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {block.data.text}
                      </h2>
                      {block.data.subtitle && (
                        <p className="text-sm text-tech-400 mt-1">{block.data.subtitle}</p>
                      )}
                    </div>
                  );

                case "pros_cons":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      {block.data.title && (
                        <h3 className="text-xl font-bold text-white mb-6 text-center">
                          {block.data.title}
                        </h3>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pros Card */}
                        <div className="p-5 rounded-2xl bg-tech-950 border border-emerald-500/30 space-y-3">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{block.data.prosTitle || "Key Advantages"}</span>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-tech-300">
                            {block.data.pros?.map((pro: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons Card */}
                        <div className="p-5 rounded-2xl bg-tech-950 border border-red-500/30 space-y-3">
                          <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider">
                            <XCircle className="w-4 h-4" />
                            <span>{block.data.consTitle || "Drawbacks / Risks"}</span>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-tech-300">
                            {block.data.cons?.map((con: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-red-400 font-bold mt-0.5">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );

                case "benchmark_bars":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      {block.data.title && (
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-brand-400" />
                            {block.data.title}
                          </h3>
                          <span className="text-[10px] text-tech-400 uppercase font-mono tracking-wider">
                            Higher is Better
                          </span>
                        </div>
                      )}

                      <div className="space-y-4">
                        {block.data.items?.map((item: any, idx: number) => {
                          const max = item.maxScore || 100;
                          const percent = Math.min(100, Math.max(0, (item.score / max) * 100));

                          return (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className={`font-semibold ${item.highlight ? "text-brand-300" : "text-tech-300"}`}>
                                  {item.label}
                                </span>
                                <span className="font-mono font-bold text-white">
                                  {item.score} {item.unit || "pts"}
                                </span>
                              </div>
                              <div className="h-3 w-full rounded-full bg-tech-950 border border-tech-800 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-1000 ${
                                    item.highlight
                                      ? "bg-gradient-to-r from-brand-500 to-emerald-400 shadow-md shadow-brand-500/30"
                                      : "bg-tech-700"
                                  }`}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );

                case "columns":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-tech-950/80 border border-tech-800 space-y-2">
                          <h4 className="text-base font-bold text-white">{block.data.col1Title}</h4>
                          <p className="text-xs sm:text-sm text-tech-300 leading-relaxed">
                            {block.data.col1Content}
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-tech-950/80 border border-tech-800 space-y-2">
                          <h4 className="text-base font-bold text-white">{block.data.col2Title}</h4>
                          <p className="text-xs sm:text-sm text-tech-300 leading-relaxed">
                            {block.data.col2Content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                case "countdown_deal":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-2 text-center sm:text-left">
                          {block.data.badge && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider">
                              <Tag className="w-3 h-3" />
                              {block.data.badge}
                            </span>
                          )}
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            {block.data.headline}
                          </h3>
                          {block.data.subtext && (
                            <p className="text-xs sm:text-sm text-tech-300 max-w-xl">
                              {block.data.subtext}
                            </p>
                          )}
                        </div>

                        <div className="p-3.5 rounded-2xl bg-tech-950/90 border border-amber-500/30 text-center shrink-0 min-w-[160px]">
                          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-amber-400">
                            <Clock className="w-3 h-3" />
                            <span>{block.data.dealEndsText || "Limited Time Offer"}</span>
                          </div>
                          <div className="font-mono font-black text-amber-300 text-lg mt-1">
                            10-Min Stock Hold
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                case "video_embed":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      {block.data.title && (
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <Play className="w-4 h-4 text-brand-400" />
                          {block.data.title}
                        </h3>
                      )}
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-tech-950 border border-tech-800">
                        {block.data.url?.includes("youtube") || block.data.url?.includes("youtu.be") ? (
                          <iframe
                            src={
                              block.data.url.includes("embed")
                                ? block.data.url
                                : "https://www.youtube.com/embed/" +
                                  (block.data.url.split("v=")[1]?.split("&")[0] ||
                                    block.data.url.split("/").pop())
                            }
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={block.data.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      {block.data.caption && (
                        <p className="text-center text-xs text-tech-500 mt-2 italic">
                          {block.data.caption}
                        </p>
                      )}
                    </div>
                  );

                case "laptop_showcase":
                  const product = embeddedProducts[block.data.productId];
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
                          <Laptop className="w-4 h-4" />
                          <span>{block.data.title || "Featured Refurbished Recommendation"}</span>
                        </div>
                        <span className="text-[10px] text-tech-400 font-mono">
                          Direct Live Stock Lock Active
                        </span>
                      </div>

                      {product ? (
                        <div className="max-w-md mx-auto">
                          <ProductCard product={product} onViewDetails={onProductViewDetails} />
                        </div>
                      ) : (
                        <div className="p-8 text-center text-tech-500 bg-tech-950 rounded-xl border border-tech-800">
                          Select a refurbished laptop from your inventory in the Block Inspector to display live stock & buy buttons.
                        </div>
                      )}

                      {block.data.caption && (
                        <p className="text-center text-xs text-tech-400 mt-4 italic">
                          {block.data.caption}
                        </p>
                      )}
                    </div>
                  );

                case "comparison_table":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      {block.data.title && (
                        <h3 className="text-xl font-bold text-white tracking-tight mb-4">
                          {block.data.title}
                        </h3>
                      )}
                      <div className="overflow-x-auto rounded-2xl border border-tech-800 bg-tech-950/80">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="border-b border-tech-800 bg-tech-900/90 text-white font-semibold">
                              {block.data.headers?.map((header: string, i: number) => (
                                <th key={i} className="p-4 font-bold text-brand-300">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-tech-800/60 text-tech-300">
                            {block.data.rows?.map((row: string[], rowIdx: number) => (
                              <tr key={rowIdx} className="hover:bg-tech-900/40 transition-colors">
                                {row.map((cell: string, cellIdx: number) => (
                                  <td key={cellIdx} className="p-4">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case "quote":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <Quote className="w-8 h-8 text-brand-500/30 float-right mb-2" />
                      <p className="text-base sm:text-xl font-medium text-white italic leading-relaxed">
                        &ldquo;{block.data.quote}&rdquo;
                      </p>
                      <div className="flex items-center justify-between text-xs mt-4 pt-3 border-t border-tech-800/60">
                        <div>
                          <span className="font-bold text-brand-300">{block.data.author}</span>
                          {block.data.role && (
                            <span className="text-tech-400"> — {block.data.role}</span>
                          )}
                        </div>
                        {block.data.rating && (
                          <div className="flex text-amber-400">
                            {"★".repeat(Number(block.data.rating))}
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "faq":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      {block.data.title && (
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                          <HelpCircle className="w-5 h-5 text-brand-400" />
                          {block.data.title}
                        </h3>
                      )}
                      <div className="space-y-3">
                        {block.data.items?.map((item: any, idx: number) => {
                          const isOpen = openFaqIndex[block.id] === idx;
                          return (
                            <div
                              key={idx}
                              className="rounded-xl border border-tech-800 bg-tech-950 overflow-hidden transition-colors"
                            >
                              <button
                                onClick={() => toggleFaq(block.id, idx)}
                                className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-brand-300"
                              >
                                <span>{item.question}</span>
                                <ChevronDown
                                  className={`w-4 h-4 text-tech-400 transition-transform duration-200 ${
                                    isOpen ? "rotate-180 text-brand-400" : ""
                                  }`}
                                />
                              </button>
                              {isOpen && (
                                <div className="px-4 pb-4 text-xs sm:text-sm text-tech-400 border-t border-tech-800/60 pt-3 leading-relaxed">
                                  {item.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );

                case "cta":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {block.data.headline}
                      </h3>
                      {block.data.subtext && (
                        <p className="text-sm sm:text-base text-tech-200 max-w-xl mx-auto font-medium mt-2">
                          {block.data.subtext}
                        </p>
                      )}
                      <div className="pt-4">
                        <Link
                          href={block.data.buttonLink || "/#catalog"}
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-tech-950 font-black text-sm shadow-xl shadow-brand-500/25 transition-transform hover:scale-105"
                        >
                          <span>{block.data.buttonText || "Shop Certified Laptops"}</span>
                          <ArrowRight className="w-4 h-4 text-tech-950" />
                        </Link>
                      </div>
                    </div>
                  );

                case "features_grid":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {block.data.items?.map((feat: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-5 rounded-2xl bg-tech-950 border border-tech-800 space-y-2"
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center font-bold text-sm">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <h4 className="font-bold text-white text-sm">{feat.title}</h4>
                            <p className="text-xs text-tech-400 leading-relaxed">{feat.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                case "image_banner":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-tech-800 bg-tech-950">
                        <Image
                          src={block.data.url || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"}
                          alt={block.data.caption || "Banner Image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {block.data.caption && (
                        <p className="text-center text-xs text-tech-500 mt-2 italic">
                          {block.data.caption}
                        </p>
                      )}
                    </div>
                  );

                case "html_code":
                  return (
                    <div className={getStyleClasses(block.style)}>
                      <div className="flex items-center gap-2 text-xs font-mono text-brand-400 mb-2">
                        <Code className="w-4 h-4" />
                        <span>Embedded Snippet / Code</span>
                      </div>
                      <pre className="p-4 rounded-xl bg-tech-950 border border-tech-800 overflow-x-auto font-mono text-xs text-tech-300 leading-relaxed">
                        <code>{block.data.code}</code>
                      </pre>
                    </div>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
    </div>
  );
};
