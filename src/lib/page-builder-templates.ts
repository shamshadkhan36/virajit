import { PageBuilderBlock } from "@/types";

export interface TemplatePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  blocks: PageBuilderBlock[];
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "buying_guide_complete",
    name: "Refurbished Laptop Buyer's Guide (Comprehensive)",
    category: "Buying Guides",
    description: "Full-scale editorial guide with hero, pros & cons, specs comparison table, embedded flagship laptop, and FAQ accordion.",
    iconName: "Sparkles",
    blocks: [
      {
        id: "tpl-b1",
        type: "hero",
        style: {
          bgPreset: "emerald_glow",
          align: "left",
          padding: "spacious",
          borderRadius: "3xl",
          shadowGlow: "brand_glow",
        },
        data: {
          badge: "2026 Hardware Masterclass",
          title: "How to Buy a Refurbished Laptop Like a Silicon Valley Engineer",
          subtitle: "Stop overpaying for brand-new retail plastic. Why enterprise-grade lease returns give you 2x the build quality and 60% savings.",
        },
      },
      {
        id: "tpl-b2",
        type: "pros_cons",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          title: "Certified Refurbished vs Brand New Budget ($600-$900)",
          prosTitle: "Why Refurbished Business Tier Wins",
          pros: [
            "Aerospace CNC Aluminum & Carbon Fiber chassis (Mil-Spec 810H)",
            "100% sRGB & 400+ nits Liquid Retina or OLED displays",
            "Upgraded fast PCIe 4.0 NVMe SSDs & Repasted Phase-Change thermals",
            "90%+ Battery capacity backed by full 12-month hardware warranty",
          ],
          consTitle: "Drawbacks of Retail Budget New",
          cons: [
            "Cheap molded ABS plastic that flexes and cracks after 2 years",
            "Low-tier 250 nits 45% NTSC washed out screens",
            "Non-upgradable soldered budget hardware",
            "Loses 50% market value within the first 6 months",
          ],
        },
      },
      {
        id: "tpl-b3",
        type: "benchmark_bars",
        style: {
          bgPreset: "glass",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          title: "Real-World Multi-Tasking & Battery Longevity Benchmarks",
          items: [
            { label: "MacBook Pro M3 Pro (Refurbished Grade A+)", score: 96, maxScore: 100, unit: "Points", highlight: true },
            { label: "Dell XPS 15 9530 i7-13700H (Certified)", score: 92, maxScore: 100, unit: "Points", highlight: false },
            { label: "Lenovo ThinkPad X1 Carbon Gen 11 (Certified)", score: 88, maxScore: 100, unit: "Points", highlight: false },
            { label: "Brand New Retail Budget Core i3 ($699)", score: 48, maxScore: 100, unit: "Points", highlight: false },
          ],
        },
      },
      {
        id: "tpl-b4",
        type: "laptop_showcase",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          productId: "",
          title: "Editor's Certified Pick: Instant Stock Lock Deal",
          caption: "This exact model was cleaned, repasted, and passed our 48-point hardware diagnostic test.",
        },
      },
      {
        id: "tpl-b5",
        type: "comparison_table",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          title: "Refurbished Cosmetic Grade Matrix",
          headers: ["Inspection Criterion", "Grade A+ (Pristine)", "Grade A (Excellent)", "Grade B+ (Very Good)"],
          rows: [
            ["Screen Condition", "Zero scratches, 100% pixel test", "No visible marks when turned on", "Minor micro-wear outside viewing area"],
            ["Battery Health", "95% - 100% capacity", "90% - 94% capacity", "85% - 89% capacity"],
            ["Chassis Body", "Flawless / Like-new", "Minor microscopic hairline signs", "Light scuff on bottom base plate"],
            ["Warranty Included", "12 Months Comprehensive", "12 Months Comprehensive", "6 Months Comprehensive"],
          ],
        },
      },
      {
        id: "tpl-b6",
        type: "faq",
        style: {
          bgPreset: "transparent",
          padding: "normal",
        },
        data: {
          title: "Refurbished Stock & Hold Questions",
          items: [
            {
              question: "How does the 10-Minute Stock Lock prevent cart sniping?",
              answer: "Because we often have only 1 unit of high-spec machines (like 32GB RAM or OLED panels), clicking 'Lock Unit & Buy Now' reserves the unit exclusively to your session for 10 minutes.",
            },
            {
              question: "What happens if I don't finish checkout in 10 minutes?",
              answer: "The lock safely releases automatically and returns the unit to the general inventory pool so other shoppers get an opportunity.",
            },
            {
              question: "What does the 12-Month Hardware Warranty cover?",
              answer: "100% coverage for motherboard, screen panel, keyboard, SSD, memory, and charging ports with free replacement or repair.",
            },
          ],
        },
      },
      {
        id: "tpl-b7",
        type: "cta",
        style: {
          bgPreset: "emerald_glow",
          align: "center",
          padding: "spacious",
          borderRadius: "3xl",
          shadowGlow: "brand_glow",
        },
        data: {
          headline: "Ready to Lock Your Certified Laptop?",
          subtext: "Explore our real-time stock catalog with verified battery health and 2-day express insured shipping.",
          buttonText: "Browse In-Stock Refurbished Laptops",
          buttonLink: "/#catalog",
        },
      },
    ],
  },
  {
    id: "teardown_comparison",
    name: "Model vs Model Teardown & Benchmarks",
    category: "Hardware Reviews",
    description: "Deep comparison layout featuring video review embed, multi-column breakdown, benchmark bars, and featured products.",
    iconName: "Layers",
    blocks: [
      {
        id: "tp2-b1",
        type: "hero",
        style: {
          bgPreset: "purple_velvet",
          align: "left",
          padding: "spacious",
          borderRadius: "3xl",
          shadowGlow: "purple_glow",
        },
        data: {
          badge: "Head-to-Head Teardown",
          title: "MacBook Pro M3 Pro vs Dell XPS 15 9530: The Refurbished Shootout",
          subtitle: "We tore down both flagships to test thermal dissipation, battery endurance, and long-term repairability.",
        },
      },
      {
        id: "tp2-b2",
        type: "columns",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          col1Title: "Apple MacBook Pro 14 M3 Pro",
          col1Content: "Liquid Retina XDR 120Hz display with unbeatable 18-hour real-world battery life. Fan stays completely silent under video editing and coding workloads.",
          col2Title: "Dell XPS 15 9530 (RTX 4060)",
          col2Content: "Breathtaking 3.5K OLED touchscreen with dedicated NVIDIA RTX graphics. Upgradable dual M.2 NVMe SSD slots and user-replaceable DDR5 RAM.",
        },
      },
      {
        id: "tp2-b3",
        type: "benchmark_bars",
        style: {
          bgPreset: "cyberpunk",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          title: "Thermal & Gaming Endurance Benchmarks (Sub-75°C)",
          items: [
            { label: "MacBook Pro M3 Pro Thermal Score", score: 98, maxScore: 100, unit: "/ 100", highlight: true },
            { label: "Dell XPS 15 (Honeywell PTM7950 Repaste)", score: 91, maxScore: 100, unit: "/ 100", highlight: true },
            { label: "Factory Stock Unserviced XPS 15", score: 68, maxScore: 100, unit: "/ 100", highlight: false },
          ],
        },
      },
      {
        id: "tp2-b4",
        type: "laptop_showcase",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          productId: "",
          title: "Tested Model in Stock: Apple MacBook Pro 14",
          caption: "1 Unit in Grade A+ condition ready for immediate 10-minute hold lock.",
        },
      },
      {
        id: "tp2-b5",
        type: "cta",
        style: {
          bgPreset: "purple_velvet",
          align: "center",
          padding: "spacious",
          borderRadius: "3xl",
        },
        data: {
          headline: "Lock Your Preferred Workstation Before It Sells Out",
          subtext: "All certified units include 12 months comprehensive hardware warranty and original chargers.",
          buttonText: "View Current Inventory",
          buttonLink: "/#catalog",
        },
      },
    ],
  },
  {
    id: "flash_deal_showcase",
    name: "Flash Sale & Limited Stock Clearance",
    category: "Buying Guides",
    description: "High-urgency promotional page with countdown deal banner, product highlights, and customer testimonial quotes.",
    iconName: "Zap",
    blocks: [
      {
        id: "tp3-b1",
        type: "countdown_deal",
        style: {
          bgPreset: "sunset",
          padding: "normal",
          borderRadius: "2xl",
          shadowGlow: "amber_glow",
        },
        data: {
          badge: "Weekend Flash Event",
          headline: "Exclusive Corporate Lease Return Clearance — Extra $100 OFF",
          subtext: "Use checkout coupon 'CIRCULAP100' on all Grade A+ ThinkPads and MacBooks.",
          dealEndsText: "Sale Ends Sunday Midnight",
        },
      },
      {
        id: "tp3-b2",
        type: "features_grid",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          items: [
            { title: "10-Min Cart Hold", description: "Lock 1 unit from stock while completing your shipping address." },
            { title: "48-Point Diagnostic", description: "Every hardware sensor, port, and key is tested & certified." },
            { title: "2-Day Insured Delivery", description: "Packed in reinforced shock-proof OEM packaging." },
          ],
        },
      },
      {
        id: "tp3-b3",
        type: "laptop_showcase",
        style: {
          bgPreset: "dark",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          productId: "",
          title: "Spotlight Deal of the Day",
          caption: "Certified 98% battery health with 12 months full warranty.",
        },
      },
      {
        id: "tp3-b4",
        type: "quote",
        style: {
          bgPreset: "glass",
          padding: "normal",
          borderRadius: "2xl",
        },
        data: {
          quote: "I bought a refurbished ThinkPad X1 Carbon for my engineering degree. It looks brand new and runs faster than my roommate's $1,500 new laptop.",
          author: "Daniel Vance",
          role: "Software Engineering Student",
          rating: 5,
        },
      },
      {
        id: "tp3-b5",
        type: "cta",
        style: {
          bgPreset: "emerald_glow",
          align: "center",
          padding: "spacious",
          borderRadius: "3xl",
          shadowGlow: "brand_glow",
        },
        data: {
          headline: "Grab Your Certified Unit Before Stock Runs Out",
          subtext: "Units are limited to 1 or 2 per configuration. Lock your unit now.",
          buttonText: "Shop Flash Deals",
          buttonLink: "/#catalog",
        },
      },
    ],
  },
];
