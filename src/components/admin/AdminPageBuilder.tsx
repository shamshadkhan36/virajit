"use client";

import React, { useState, useEffect, useRef } from "react";
import { BlogPost, PageBuilderBlock, BlockType, Product, BlockStyleSettings } from "@/types";
import { BlockRenderer } from "@/components/blog/BlockRenderer";
import { TEMPLATE_PRESETS, TemplatePreset } from "@/lib/page-builder-templates";
import {
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Copy,
  Eye,
  Edit3,
  Save,
  Laptop,
  Type,
  Heading,
  Image as ImageIcon,
  Table,
  Quote,
  HelpCircle,
  Megaphone,
  Grid,
  CheckCircle2,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  ArrowLeft,
  Globe,
  Undo,
  Redo,
  Layers,
  Play,
  TrendingUp,
  Tag,
  Code,
  FileCode,
  LayoutTemplate,
  X,
} from "lucide-react";

interface AdminPageBuilderProps {
  initialPost?: BlogPost | null;
  onSaved?: () => void;
  onCancel?: () => void;
}

const ADVANCED_BLOCK_DEFINITIONS: {
  type: BlockType;
  category: "Structure & Text" | "Hardware & Showcases" | "Visual & Media" | "Conversions & CTAs";
  label: string;
  description: string;
  icon: any;
  defaultData: any;
  defaultStyle?: BlockStyleSettings;
}[] = [
  {
    type: "hero",
    category: "Structure & Text",
    label: "Hero Banner",
    description: "High-impact headline with badge & gradient background",
    icon: Sparkles,
    defaultStyle: { bgPreset: "emerald_glow", align: "left", padding: "spacious", borderRadius: "3xl", shadowGlow: "brand_glow" },
    defaultData: {
      badge: "2026 Buying Guide",
      title: "How to Choose the Best Refurbished Laptop",
      subtitle: "Stop overpaying for retail when enterprise grade laptops offer better longevity.",
    },
  },
  {
    type: "paragraph",
    category: "Structure & Text",
    label: "Rich Paragraph",
    description: "Body text with formatting, highlights, and bullet points",
    icon: Type,
    defaultStyle: { bgPreset: "glass", align: "left", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      content:
        "Refurbished laptops from corporate fleets are inspected, cleaned, and benchmarked before re-entering the market.\n\nThis provides massive savings while maintaining Grade A performance.",
    },
  },
  {
    type: "heading",
    category: "Structure & Text",
    label: "Section Heading",
    description: "H2 or H3 heading with optional subtitle",
    icon: Heading,
    defaultStyle: { bgPreset: "transparent", align: "left", padding: "compact" },
    defaultData: {
      text: "Understanding Battery Health & Cosmetic Grades",
      subtitle: "Why 90%+ battery capacity is the golden benchmark.",
    },
  },
  {
    type: "columns",
    category: "Structure & Text",
    label: "2-Column Layout",
    description: "Side-by-side text and feature breakdown",
    icon: Layers,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      col1Title: "Corporate Lease Returns",
      col1Content: "Heavy-duty magnesium alloy or CNC aluminum frames designed for 7+ years of rigorous enterprise use.",
      col2Title: "Consumer Retail Plastic",
      col2Content: "Thin molded plastic chassis with weak hinge points and washed-out budget displays.",
    },
  },
  {
    type: "laptop_showcase",
    category: "Hardware & Showcases",
    label: "Featured Laptop Embed",
    description: "Embed live refurbished laptop card with 10-minute hold lock & buy button",
    icon: Laptop,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl", shadowGlow: "elevated" },
    defaultData: {
      productId: "",
      title: "Recommended Flagship Deal",
      caption: "Tested and covered by our 12-month complete hardware warranty.",
    },
  },
  {
    type: "pros_cons",
    category: "Hardware & Showcases",
    label: "Pros & Cons Box",
    description: "Green checks vs Red crosses comparison box",
    icon: CheckCircle2,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      title: "Refurbished Business vs Budget Retail New",
      prosTitle: "Refurbished Business Tier",
      pros: [
        "Aerospace grade CNC aluminum construction",
        "400+ nits 100% sRGB or OLED panels",
        "90%+ tested battery health guaranteed",
      ],
      consTitle: "Budget Retail New",
      cons: [
        "Molded ABS plastic chassis flexes easily",
        "Washed out 250 nits display",
        "Soldered budget memory with low resale value",
      ],
    },
  },
  {
    type: "benchmark_bars",
    category: "Hardware & Showcases",
    label: "Specs & Benchmark Bars",
    description: "Interactive animated progress bars for performance & battery scores",
    icon: TrendingUp,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      title: "Multi-Core Thermal & Battery Longevity Score",
      items: [
        { label: "MacBook Pro M3 Pro (18-Hr Battery)", score: 96, maxScore: 100, unit: "pts", highlight: true },
        { label: "Dell XPS 15 9530 i7-13700H (Repasted)", score: 92, maxScore: 100, unit: "pts", highlight: true },
        { label: "Standard Retail Core i3 Plastic", score: 45, maxScore: 100, unit: "pts", highlight: false },
      ],
    },
  },
  {
    type: "comparison_table",
    category: "Hardware & Showcases",
    label: "Comparison Table",
    description: "Custom matrix with dynamic rows & columns",
    icon: Table,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      title: "Cosmetic Grade Comparison",
      headers: ["Grade Level", "Chassis Appearance", "Battery Health %", "Warranty"],
      rows: [
        ["Grade A+ (Pristine)", "Flawless / Like-New", "95% - 100%", "12 Months Full"],
        ["Grade A (Excellent)", "Micro-wear on base", "90% - 94%", "12 Months Full"],
        ["Grade B+ (Very Good)", "Light cosmetic scuffs", "85% - 89%", "6 Months Full"],
      ],
    },
  },
  {
    type: "countdown_deal",
    category: "Conversions & CTAs",
    label: "Flash Deal Banner",
    description: "Urgency banner with stock lock alert",
    icon: Tag,
    defaultStyle: { bgPreset: "sunset", padding: "normal", borderRadius: "2xl", shadowGlow: "amber_glow" },
    defaultData: {
      badge: "Limited Stock Alert",
      headline: "Weekend Clearance: Save an Extra ₹2,000 with code 'VIRAJ2000'",
      subtext: "Units are limited to 1 or 2 per configuration. Lock yours before stock is reserved.",
      dealEndsText: "Sale Active Now",
    },
  },
  {
    type: "cta",
    category: "Conversions & CTAs",
    label: "Call to Action Banner",
    description: "High-converting action box with custom button link",
    icon: Megaphone,
    defaultStyle: { bgPreset: "emerald_glow", align: "center", padding: "spacious", borderRadius: "3xl", shadowGlow: "brand_glow" },
    defaultData: {
      headline: "Find Your Next Certified Laptop Today",
      subtext: "Explore our live inventory with real-time stock locks and fast local Mumbai delivery.",
      buttonText: "Browse In-Stock Refurbished Laptops",
      buttonLink: "/#catalog",
    },
  },
  {
    type: "quote",
    category: "Conversions & CTAs",
    label: "Quote / Testimonial",
    description: "Highlighted review quote with author, role, and star rating",
    icon: Quote,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      quote: "Buying certified refurbished from Viraj Infotech saved our Mumbai startup ₹1,00,000 without a single hardware hiccup.",
      author: "Amit Joshi",
      role: "Founder, TechOps Mumbai",
      rating: 5,
    },
  },
  {
    type: "faq",
    category: "Conversions & CTAs",
    label: "FAQ Accordion",
    description: "Collapsible questions and answers",
    icon: HelpCircle,
    defaultStyle: { bgPreset: "transparent", padding: "normal" },
    defaultData: {
      title: "Common Questions About Refurbished Tech",
      items: [
        {
          question: "How does the 10-minute stock lock work?",
          answer: "When you start checkout, 1 unit is locked exclusively to your cart for 10 minutes so no one else can take it.",
        },
        {
          question: "What is included in the packaging?",
          answer: "Every unit comes with the original fast charger, OEM diagnostic sheet, and protective sleeve.",
        },
      ],
    },
  },
  {
    type: "video_embed",
    category: "Visual & Media",
    label: "Video Review Embed",
    description: "YouTube or video embed with responsive player",
    icon: Play,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      title: "Watch 40-Point Diagnostic Inspection Video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "Step-by-step video of thermal repasting and battery testing.",
    },
  },
  {
    type: "image_banner",
    category: "Visual & Media",
    label: "Image Banner",
    description: "High-resolution photo with caption",
    icon: ImageIcon,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      caption: "Precision inspection and cleanroom thermal repasting process.",
    },
  },
  {
    type: "features_grid",
    category: "Visual & Media",
    label: "3-Column Features Grid",
    description: "Grid cards highlighting benefits or diagnostic criteria",
    icon: Grid,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      items: [
        { title: "40-Point Diagnostic", description: "Every hardware sensor, port, and key is tested." },
        { title: "Battery Guaranteed", description: "Minimum 90%+ battery capacity on all Grade A+ units." },
        { title: "6-12M Warranty", description: "Zero-cost parts and labor replacement warranty." },
      ],
    },
  },
  {
    type: "html_code",
    category: "Visual & Media",
    label: "Code / Embed Snippet",
    description: "Embed custom code snippet or iframe",
    icon: Code,
    defaultStyle: { bgPreset: "glass", padding: "normal", borderRadius: "2xl" },
    defaultData: {
      code: "// Diagnostic Benchmark Script\nconst healthCheck = diagnostics.run();\nconsole.log('Passed 40-Point Inspection');",
    },
  },
];

export const AdminPageBuilder: React.FC<AdminPageBuilderProps> = ({
  initialPost,
  onSaved,
  onCancel,
}) => {
  // Post Metadata
  const [title, setTitle] = useState(initialPost?.title || "New Refurbished Buying Guide");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [excerpt, setExcerpt] = useState(
    initialPost?.excerpt || "Expert guide on choosing the best refurbished tech."
  );
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage ||
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
  );
  const [category, setCategory] = useState(initialPost?.category || "Buying Guides");
  const [author, setAuthor] = useState(initialPost?.author || "Viraj Infotech Team");
  const [readTime, setReadTime] = useState(initialPost?.readTime || "5 min read");
  const [isPublished, setIsPublished] = useState(initialPost?.isPublished ?? true);

  // Blocks & History
  const [blocks, setBlocks] = useState<PageBuilderBlock[]>([]);
  const [history, setHistory] = useState<PageBuilderBlock[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Active Selected Block & Inspector Tab
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [inspectorTab, setInspectorTab] = useState<"content" | "style" | "spacing">("content");

  // Viewport & Studio Mode
  const [viewMode, setViewMode] = useState<"builder" | "split" | "preview">("split");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [paletteCategory, setPaletteCategory] = useState<string>("All");

  // Modals
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [jsonText, setJsonText] = useState("");

  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available products
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  const pushState = (newBlocks: PageBuilderBlock[]) => {
    setBlocks(newBlocks);
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, JSON.parse(JSON.stringify(newBlocks))];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setBlocks(JSON.parse(JSON.stringify(history[targetIndex])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setBlocks(JSON.parse(JSON.stringify(history[targetIndex])));
    }
  };

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAvailableProducts(data.products || []);
      })
      .catch((err) => console.error("Error loading products:", err));

    if (initialPost?.blocks) {
      try {
        const parsed = JSON.parse(initialPost.blocks);
        setBlocks(parsed);
        setHistory([JSON.parse(JSON.stringify(parsed))]);
        setHistoryIndex(0);
        if (parsed.length > 0) setSelectedBlockId(parsed[0].id);
      } catch {
        setBlocks([]);
      }
    } else {
      const starter = TEMPLATE_PRESETS[0].blocks;
      setBlocks(starter);
      setHistory([JSON.parse(JSON.stringify(starter))]);
      setHistoryIndex(0);
      if (starter.length > 0) setSelectedBlockId(starter[0].id);
    }
  }, [initialPost]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialPost) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  const addBlock = (def: (typeof ADVANCED_BLOCK_DEFINITIONS)[0]) => {
    const newBlock: PageBuilderBlock = {
      id: "block-" + Math.random().toString(36).substring(2, 9),
      type: def.type,
      data: JSON.parse(JSON.stringify(def.defaultData)),
      style: def.defaultStyle ? JSON.parse(JSON.stringify(def.defaultStyle)) : undefined,
    };

    if (def.type === "laptop_showcase" && availableProducts.length > 0) {
      newBlock.data.productId = availableProducts[0].id;
    }

    const updated = [...blocks, newBlock];
    pushState(updated);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = blocks.filter((b) => b.id !== id);
    pushState(updated);
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const duplicateBlock = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;
    const target = blocks[index];
    const duplicated: PageBuilderBlock = {
      id: "block-" + Math.random().toString(36).substring(2, 9),
      type: target.type,
      data: JSON.parse(JSON.stringify(target.data)),
      style: target.style ? JSON.parse(JSON.stringify(target.style)) : undefined,
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, duplicated);
    pushState(newBlocks);
    setSelectedBlockId(duplicated.id);
  };

  const moveBlockUp = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index <= 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index - 1];
    newBlocks[index - 1] = newBlocks[index];
    newBlocks[index] = temp;
    pushState(newBlocks);
  };

  const moveBlockDown = (index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (index >= blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index + 1];
    newBlocks[index + 1] = newBlocks[index];
    newBlocks[index] = temp;
    pushState(newBlocks);
  };

  const updateBlockData = (id: string, key: string, value: any) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        data: {
          ...b.data,
          [key]: value,
        },
      };
    });
    pushState(updated);
  };

  const updateBlockStyle = (id: string, key: keyof BlockStyleSettings, value: any) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        style: {
          ...b.style,
          [key]: value,
        },
      };
    });
    pushState(updated);
  };

  const loadPresetTemplate = (preset: TemplatePreset) => {
    const instantiatedBlocks = preset.blocks.map((b) => {
      const nb = { ...b, id: "block-" + Math.random().toString(36).substring(2, 9) };
      if (nb.type === "laptop_showcase" && availableProducts.length > 0) {
        nb.data.productId = availableProducts[0].id;
      }
      return nb;
    });
    pushState(instantiatedBlocks);
    setIsTemplateModalOpen(false);
    if (instantiatedBlocks.length > 0) setSelectedBlockId(instantiatedBlocks[0].id);
  };

  const handleOpenJsonModal = () => {
    setJsonText(JSON.stringify(blocks, null, 2));
    setIsJsonModalOpen(true);
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed)) {
        pushState(parsed);
        setIsJsonModalOpen(false);
        if (parsed.length > 0) setSelectedBlockId(parsed[0].id);
      } else {
        alert("Invalid JSON format: Must be an array of blocks.");
      }
    } catch (err: any) {
      alert("JSON parsing error: " + err.message);
    }
  };

  const handleSavePost = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const url = initialPost ? `/api/blogs/${initialPost.id}` : "/api/blogs";
      const method = initialPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          coverImage,
          category,
          author,
          readTime,
          isPublished,
          blocks,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to save blog post.");
        setIsSaving(false);
        return;
      }

      setSaveSuccess(true);
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onSaved) onSaved();
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
      setIsSaving(false);
    }
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
  const categoriesList = ["All", "Structure & Text", "Hardware & Showcases", "Visual & Media", "Conversions & CTAs"];
  const filteredBlockDefs = ADVANCED_BLOCK_DEFINITIONS.filter(
    (d) => paletteCategory === "All" || d.category === paletteCategory
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] bg-white text-slate-900 rounded-[32px] border border-cream-300 overflow-hidden shadow-xl">
      {/* TOP STUDIO TOOLBAR */}
      <div className="h-16 px-6 bg-cream-50 border-b border-cream-300 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-2 rounded-xl bg-white hover:bg-cream-100 text-slate-700 border border-cream-300 transition-colors shadow-sm"
              title="Return to Articles List"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Studio Page Builder
              </span>
              <span className="text-[10px] bg-cream-200 px-2 py-0.5 rounded text-slate-700 font-mono font-bold">
                {blocks.length} Blocks
              </span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 truncate max-w-xs sm:max-w-sm">
              {title || "Untitled Article"}
            </h2>
          </div>
        </div>

        {/* Studio Tools */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-cream-300 shadow-sm">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-cream-100 disabled:opacity-30 transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-cream-100 disabled:opacity-30 transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preset Templates */}
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold transition-colors"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Templates</span>
          </button>

          {/* JSON Layout Code */}
          <button
            onClick={handleOpenJsonModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-cream-100 text-slate-700 border border-cream-300 text-xs font-semibold transition-colors shadow-sm"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON Code</span>
          </button>

          {/* View Mode Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-cream-300 text-xs shadow-sm">
            <button
              onClick={() => setViewMode("builder")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                viewMode === "builder" ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Builder
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                viewMode === "split" ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Split
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors ${
                viewMode === "preview" ? "bg-brand-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          {/* Save Post */}
          <div className="flex items-center gap-2 ml-2">
            <label className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-cream-300 text-brand-600 focus:ring-brand-500"
              />
              <span>Published</span>
            </label>

            <button
              onClick={handleSavePost}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs shadow-md shadow-brand-600/25 transition-all"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Saved!</span>
                </>
              ) : isSaving ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  <span>Save Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN STUDIO WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: Post Settings & Palette */}
        {(viewMode === "builder" || viewMode === "split") && (
          <div className="w-80 border-r border-cream-300 bg-cream-50 p-4 overflow-y-auto space-y-6 shrink-0 text-xs">
            {/* Post Settings Card */}
            <div className="p-4 rounded-2xl bg-white border border-cream-300 space-y-3 shadow-sm">
              <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-600" /> Article SEO & Settings
              </h3>

              <div>
                <label className="text-slate-600 font-bold mb-1 block">Article Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold mb-1 block">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-600 font-bold mb-1 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  >
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="Hardware Reviews">Reviews</option>
                    <option value="Refurbishing Tech">Teardowns</option>
                    <option value="Battery Diagnostics">Diagnostics</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 font-bold mb-1 block">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold mb-1 block">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-cream-50 border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                />
              </div>
            </div>

            {/* Block Palette */}
            <div className="space-y-3">
              <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-brand-600" /> Add Blocks
              </h3>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPaletteCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
                      paletteCategory === cat
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-cream-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Block Cards */}
              <div className="grid grid-cols-1 gap-2">
                {filteredBlockDefs.map((def) => {
                  const Icon = def.icon;
                  return (
                    <button
                      key={def.type}
                      onClick={() => addBlock(def)}
                      className="p-3 rounded-2xl bg-white hover:bg-cream-100 border border-cream-300 hover:border-brand-600 text-left transition-all flex items-start gap-2.5 group shadow-sm"
                    >
                      <div className="p-2 rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 group-hover:text-brand-700">
                          {def.label}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {def.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* COLUMN 2: Canvas Layers & Inspector */}
        {(viewMode === "builder" || viewMode === "split") && (
          <div className="w-88 border-r border-cream-300 bg-white p-4 overflow-y-auto space-y-4 shrink-0 text-xs">
            {/* Layers List */}
            <div className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span>Canvas Layers ({blocks.length})</span>
                <span className="text-[10px] text-slate-400 font-medium">Reorder</span>
              </h3>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {blocks.map((block, idx) => {
                  const isSelected = selectedBlockId === block.id;
                  const def = ADVANCED_BLOCK_DEFINITIONS.find((d) => d.type === block.type);
                  const Icon = def?.icon || Sparkles;

                  return (
                    <div
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-brand-50 border-brand-600 text-brand-900 shadow-sm"
                          : "bg-cream-50 border-cream-300 text-slate-700 hover:border-cream-400"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-md bg-white text-slate-600 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border border-cream-200">
                          {idx + 1}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                        <span className="font-extrabold truncate text-xs">
                          {def?.label || block.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => moveBlockUp(idx, e)}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-cream-200 text-slate-500 hover:text-slate-900 disabled:opacity-20"
                          title="Move Up"
                        >
                          <MoveUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => moveBlockDown(idx, e)}
                          disabled={idx === blocks.length - 1}
                          className="p-1 rounded hover:bg-cream-200 text-slate-500 hover:text-slate-900 disabled:opacity-20"
                          title="Move Down"
                        >
                          <MoveDown className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => duplicateBlock(block.id, e)}
                          className="p-1 rounded hover:bg-cream-200 text-slate-500 hover:text-slate-900"
                          title="Duplicate"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => deleteBlock(block.id, e)}
                          className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TABBED BLOCK INSPECTOR */}
            {selectedBlock ? (
              <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 space-y-4 shadow-sm">
                <div className="border-b border-cream-200 pb-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-brand-700 uppercase tracking-wider text-[11px]">
                      Block Inspector
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono px-2 py-0.5 rounded bg-white border border-cream-300 font-bold">
                      {selectedBlock.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-cream-300">
                    <button
                      onClick={() => setInspectorTab("content")}
                      className={`flex-1 py-1 rounded-lg text-center font-bold text-[10px] transition-colors ${
                        inspectorTab === "content" ? "bg-brand-600 text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Content
                    </button>
                    <button
                      onClick={() => setInspectorTab("style")}
                      className={`flex-1 py-1 rounded-lg text-center font-bold text-[10px] transition-colors ${
                        inspectorTab === "style" ? "bg-brand-600 text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Theme & Glow
                    </button>
                    <button
                      onClick={() => setInspectorTab("spacing")}
                      className={`flex-1 py-1 rounded-lg text-center font-bold text-[10px] transition-colors ${
                        inspectorTab === "spacing" ? "bg-brand-600 text-white" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Layout
                    </button>
                  </div>
                </div>

                {/* Content Tab */}
                {inspectorTab === "content" && (
                  <div className="space-y-3">
                    {selectedBlock.type === "hero" && (
                      <>
                        <div>
                          <label className="text-slate-600 font-bold block mb-1">Badge</label>
                          <input
                            type="text"
                            value={selectedBlock.data.badge || ""}
                            onChange={(e) => updateBlockData(selectedBlock.id, "badge", e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 font-bold block mb-1">Title</label>
                          <input
                            type="text"
                            value={selectedBlock.data.title || ""}
                            onChange={(e) => updateBlockData(selectedBlock.id, "title", e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-slate-600 font-bold block mb-1">Subtitle</label>
                          <textarea
                            rows={2}
                            value={selectedBlock.data.subtitle || ""}
                            onChange={(e) => updateBlockData(selectedBlock.id, "subtitle", e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "paragraph" && (
                      <div>
                        <label className="text-slate-600 font-bold block mb-1">Body Content</label>
                        <textarea
                          rows={6}
                          value={selectedBlock.data.content || ""}
                          onChange={(e) => updateBlockData(selectedBlock.id, "content", e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-white border border-cream-300 text-slate-900 text-xs leading-relaxed focus:border-brand-600 outline-none"
                        />
                      </div>
                    )}

                    {selectedBlock.type === "laptop_showcase" && (
                      <>
                        <div>
                          <label className="text-slate-600 font-bold block mb-1">Select Refurbished Laptop</label>
                          <select
                            value={selectedBlock.data.productId || ""}
                            onChange={(e) => updateBlockData(selectedBlock.id, "productId", e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                          >
                            {availableProducts.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} (₹{Math.round(p.price).toLocaleString('en-IN')})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-600 font-bold block mb-1">Card Header Title</label>
                          <input
                            type="text"
                            value={selectedBlock.data.title || ""}
                            onChange={(e) => updateBlockData(selectedBlock.id, "title", e.target.value)}
                            className="w-full p-2 rounded-lg bg-white border border-cream-300 text-slate-900 focus:border-brand-600 outline-none"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Style Tab */}
                {inspectorTab === "style" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">Background Theme</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: "transparent", label: "Transparent" },
                          { id: "glass", label: "Cream Card" },
                          { id: "emerald_glow", label: "Emerald Glow" },
                          { id: "purple_velvet", label: "Velvet Purple" },
                          { id: "sunset", label: "Sunset Amber" },
                          { id: "dark", label: "Deep Forest" },
                        ].map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => updateBlockStyle(selectedBlock.id, "bgPreset", preset.id)}
                            className={`p-2 rounded-xl text-[10px] font-bold text-center border transition-all ${
                              (selectedBlock.style?.bgPreset || "glass") === preset.id
                                ? "bg-brand-600 text-white shadow-sm"
                                : "bg-white border-cream-300 text-slate-700 hover:bg-cream-100"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout Tab */}
                {inspectorTab === "spacing" && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-600 font-bold block mb-1">Text Alignment</label>
                      <div className="grid grid-cols-4 gap-1">
                        {["left", "center", "right", "justify"].map((align) => (
                          <button
                            key={align}
                            onClick={() => updateBlockStyle(selectedBlock.id, "align", align)}
                            className={`p-2 rounded-xl text-[10px] font-bold text-center border capitalize transition-all ${
                              (selectedBlock.style?.align || "left") === align
                                ? "bg-brand-600 text-white shadow-sm"
                                : "bg-white border-cream-300 text-slate-700 hover:bg-cream-100"
                            }`}
                          >
                            {align}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 border border-dashed border-cream-300 rounded-2xl font-medium">
                Click any block to customize its content and theme.
              </div>
            )}
          </div>
        )}

        {/* COLUMN 3: LIVE PREVIEW */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className="flex-1 bg-cream-100 flex flex-col overflow-hidden">
            <div className="h-10 px-4 bg-white border-b border-cream-300 flex items-center justify-between shrink-0 text-xs shadow-sm">
              <span className="text-slate-500 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-600" />
                Live Reader Viewport
              </span>

              <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-lg border border-cream-200">
                <button
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1 rounded ${
                    previewDevice === "desktop" ? "bg-brand-600 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1 rounded ${
                    previewDevice === "tablet" ? "bg-brand-600 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1 rounded ${
                    previewDevice === "mobile" ? "bg-brand-600 text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center">
              <div
                className={`transition-all duration-300 ${
                  previewDevice === "mobile"
                    ? "w-[380px] bg-white border-4 border-slate-700 rounded-[32px] p-4 shadow-2xl my-4"
                    : previewDevice === "tablet"
                    ? "w-[768px] bg-cream-50 border border-cream-300 rounded-3xl p-6 shadow-xl my-4"
                    : "w-full max-w-4xl"
                }`}
              >
                {/* Meta Header */}
                <div className="mb-6 pb-4 border-b border-cream-300">
                  <div className="flex items-center gap-2 text-xs text-brand-600 font-bold uppercase tracking-wider mb-2">
                    <span>{category}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {title}
                  </h1>
                  <p className="text-sm text-slate-500 mt-2 font-normal">{excerpt}</p>
                </div>

                <BlockRenderer
                  blocks={blocks}
                  isEditable={true}
                  selectedBlockId={selectedBlockId}
                  onSelectBlock={(id) => setSelectedBlockId(id)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TEMPLATE PRESET MODAL */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-cream-300 rounded-[32px] p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-brand-600" />
                <h3 className="font-extrabold text-base text-slate-900">Choose Starter Template</h3>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-cream-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto">
              {TEMPLATE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => loadPresetTemplate(preset)}
                  className="p-4 rounded-2xl bg-cream-50 hover:bg-cream-100 border border-cream-300 hover:border-brand-600 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
                      {preset.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">
                      {preset.blocks.length} Blocks
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-700">
                    {preset.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {preset.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* JSON CODE MODAL */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white border border-cream-300 rounded-[32px] p-6 text-slate-900 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-brand-600" />
                <h3 className="font-black text-base text-slate-900">Direct JSON Layout Editor</h3>
              </div>
              <button
                onClick={() => setIsJsonModalOpen(false)}
                className="p-1 rounded-lg hover:bg-cream-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              rows={16}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-cream-50 border border-cream-300 font-mono text-xs text-slate-800 focus:outline-none focus:border-brand-600 leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2 border-t border-cream-200">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  alert("JSON copied to clipboard!");
                }}
                className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-bold"
              >
                Copy JSON
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsJsonModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-cream-100 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyJson}
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-black shadow-sm"
                >
                  Apply to Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
