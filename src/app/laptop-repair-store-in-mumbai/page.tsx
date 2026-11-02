import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Cpu,
  Monitor,
  BatteryCharging,
  HardDrive,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Laptop Repair in Kandivali West, Mumbai | Viraj IT",
  description:
    "Expert laptop repair, diagnostics, motherboard chip-level faults and upgrades with Viraj IT in Kandivali West, Mumbai.",
};

const PROBLEMS = [
  {
    number: "01",
    symbol: "⏻",
    title: "Laptop Not Starting",
    desc: "Power failures, unexpected restarts, dead motherboards, and blue-screen errors.",
  },
  {
    number: "02",
    symbol: "▣",
    title: "Screen & Hinge Problems",
    desc: "Broken screens, flickering panels, damaged hinges, and chassis fabrication.",
  },
  {
    number: "03",
    symbol: "ϟ",
    title: "Battery & Charging Issues",
    desc: "Battery drainage, charging port faults, dead adapters, and power IC repairs.",
  },
  {
    number: "04",
    symbol: "⌘",
    title: "Motherboard Problems",
    desc: "Diagnosis and chip-level repair assessment for eligible faults and short circuits.",
  },
  {
    number: "05",
    symbol: "◌",
    title: "Overheating & Shutdowns",
    desc: "Fan problems, excessive heating, dried thermal paste, and sudden shutdowns.",
  },
  {
    number: "06",
    symbol: "↑",
    title: "Slow Laptop & Upgrades",
    desc: "Ultra-fast NVMe SSD, RAM expansions, and performance optimization.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Share the Problem",
    desc: "Tell us what your laptop is doing and describe the symptoms.",
  },
  {
    number: "02",
    title: "Get It Checked",
    desc: "Our technician examines the reported issue at our workshop lab.",
  },
  {
    number: "03",
    title: "Review the Estimate",
    desc: "Understand the suggested repair and transparent estimated cost.",
  },
  {
    number: "04",
    title: "Approve the Repair",
    desc: "Proceed once you’re comfortable with the recommended work.",
  },
];

const STORIES = [
  {
    image: "/repair/overheating fan thermal repair.png",
    alt: "Laptop overheating, cooling fan cleaning and thermal paste servicing on workbench",
    tag: "CASE STUDY SLOT",
    title: "Overheating or clogged fan",
    desc: "Thermal throttling, loud fan noise, and sudden shutdowns. Our technician disassembles the cooling heatsink, cleans lint blockages with precision brushes, and applies premium thermal compound for smooth heat transfer.",
  },
  {
    image: "/repair/screen or hinge repair.png",
    alt: "Laptop screen replacement and hinge bracket fabrication on repair workbench",
    tag: "CASE STUDY SLOT",
    title: "Screen or hinge repair",
    desc: "Cracked LCD/LED panels, display artifacts, and broken hinge anchor mounts. We replace panels with genuine OEM displays and reconstruct damaged chassis hinges with heavy-duty structural resin bonding.",
  },
  {
    image: "/repair/ssd or ram upgrade.png",
    alt: "High speed NVMe M.2 SSD and RAM installation into laptop motherboard",
    tag: "CASE STUDY SLOT",
    title: "SSD or RAM upgrade",
    desc: "Slow boot times and laggy multitasking. Installing an ultra-fast NVMe M.2 solid-state drive and doubling RAM capacity delivers up to 5x faster read/write speeds with full operating system and data migration.",
  },
];

const FAQS = [
  {
    q: "Do you repair laptops from different brands?",
    a: "Yes. Tell our team the brand, model and issue. We repair all major brands including Dell, HP, Lenovo, Asus, Acer, Apple MacBook, and Toshiba.",
  },
  {
    q: "Can I get my laptop checked before deciding on a repair?",
    a: "You can request an assessment and review the recommended work and estimated costs before approving a repair. Ask the team about diagnostic charges.",
  },
  {
    q: "Do you repair laptop motherboards?",
    a: "Viraj IT specializes in chip-level motherboard repair, power IC replacement, BGA rework, and liquid damage restoration after detailed diagnosis.",
  },
  {
    q: "How long does a laptop repair take?",
    a: "Routine repairs like screen, battery, fan servicing, or SSD upgrade are completed the same day. Complex chip-level motherboard repairs usually take 24–48 hours.",
  },
  {
    q: "Is there a warranty on laptop repairs?",
    a: "Yes. All hardware repairs and replacement parts come with a store replacement warranty. Confirm specific warranty terms for your repair with the technician.",
  },
  {
    q: "Should I back up my data before repair?",
    a: "If you can access your files, make a backup before handing over the laptop. If your laptop doesn't power on, our technician can perform a safe data backup upon request.",
  },
];

export default function LaptopRepairPage() {
  const whatsappUrl =
    "https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%20need%20help%20with%20a%20laptop%20repair.%20Please%20advise%20how%20to%20get%20it%20checked.";
  const motherboardWaUrl =
    "https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20ask%20about%20motherboard%20or%20chip-level%20laptop%20repair.";

  return (
    <div className="bg-white text-[#0f0e17] selection:bg-[#b30c7a] selection:text-white pb-16">
      {/* Breadcrumb matching Wireframe */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 text-xs sm:text-sm font-semibold text-[#0f0e17] flex items-center gap-2"
      >
        <Link href="/" className="hover:text-[#b30c7a] transition-colors">
          Home
        </Link>
        <span aria-hidden="true" className="text-slate-400">
          /
        </span>
        <span className="text-slate-600">IT Services</span>
        <span aria-hidden="true" className="text-slate-400">
          /
        </span>
        <span className="text-[#0f0e17] font-bold">Laptop Repair</span>
      </nav>

      {/* HERO SECTION MATCHING WIREFRAME (.repair-hero) */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        aria-labelledby="page-title"
      >
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2.5 text-[#b30c7a] text-xs sm:text-sm font-black uppercase tracking-[0.14em]">
            <span className="w-6 h-[2px] bg-[#b30c7a]" aria-hidden="true" />
            <span>Laptop Repair in Kandivali West</span>
          </div>

          <h1
            id="page-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f0e17] tracking-tight leading-[1.08] font-['Space_Grotesk']"
          >
            Laptop Repair Services in{" "}
            <em className="not-italic text-[#b30c7a]">Kandivali West</em>
          </h1>

          <p className="font-['Space_Grotesk'] text-xl sm:text-2xl lg:text-[1.85rem] font-bold text-[#32123b] leading-snug tracking-tight">
            Laptop Not Working? Let’s Find the Cause.
          </p>

          <p className="text-base sm:text-lg text-[#0f0e17] leading-relaxed max-w-2xl font-medium">
            Unexpected restarts, screen damage, charging issues or slow performance? Get your laptop checked by Viraj IT’s certified repair team and understand the available repair options before making any decision.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 min-h-[54px] px-7 py-3.5 rounded-full bg-[#b30c7a] hover:bg-[#97086a] text-white font-black text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#b30c7a]/20"
            >
              <span>Book Repair on WhatsApp</span>
              <span aria-hidden="true" className="text-lg leading-none">↗</span>
            </a>

            <a
              href="#visit"
              className="inline-flex items-center justify-between gap-3 min-h-[54px] px-7 py-3.5 rounded-full border-[1.5px] border-[#c9bdcb] hover:border-[#b30c7a] bg-white text-[#0f0e17] hover:text-[#b30c7a] font-black text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-sm"
            >
              <span>Visit Repair Store</span>
              <span aria-hidden="true" className="text-lg leading-none">↗</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#0f0e17] font-semibold pt-1">
            Describe the issue and your laptop model when you message us.
          </p>
        </div>

        {/* Hero Image Container */}
        <div className="lg:col-span-5">
          <div
            className="w-full h-[360px] sm:h-[460px] rounded-[26px] overflow-hidden border border-[#ded7e0] bg-[#f5edf4] shadow-xl relative"
            role="img"
            aria-label="Viraj IT Certified Hardware Repair Technician inspecting laptop motherboard in workshop"
          >
            <img
              src="/repair/laptop repair hero section.png"
              alt="Viraj IT Certified Hardware Repair Technician inspecting laptop motherboard with precision tools in Kandivali workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 01 / REPAIR SERVICES (.problems) */}
      <section id="problems" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-9" aria-labelledby="problems-title">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
            01 / REPAIR SERVICES
          </p>
          <h2
            id="problems-title"
            className="text-3xl sm:text-4xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk']"
          >
            What’s Wrong with Your Laptop?
          </h2>
          <p className="text-base sm:text-lg text-[#0f0e17] font-medium">
            Explore common laptop problems our technicians can help diagnose and repair.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((item) => (
            <article
              key={item.number}
              className="relative min-h-[220px] rounded-[20px] border border-[#ded7e0] bg-white p-6 sm:p-7 shadow-sm hover:border-[#d8bcd1] hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span className="absolute top-5 right-6 text-xs sm:text-sm font-black text-[#b30c7a]">
                {item.number}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#f8eaf3] text-[#b30c7a] text-2xl font-black flex items-center justify-center mb-5">
                <span aria-hidden="true">{item.symbol}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#0f0e17] mb-2 font-['Space_Grotesk']">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-[#0f0e17] leading-relaxed font-medium">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 02 / TECHNICAL EXPERTISE & MOTHERBOARD (.expertise-section) */}
      <section
        id="motherboard"
        className="w-full bg-[#faf7fa] border-y border-[#ded7e0] py-16 sm:py-20"
        aria-labelledby="expertise-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
              02 / TECHNICAL EXPERTISE
            </p>
            <h2
              id="expertise-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk'] leading-tight"
            >
              Not Every Laptop Problem Needs Replacement.
            </h2>
            <p className="text-base sm:text-lg text-[#0f0e17] leading-relaxed font-medium">
              Some laptop faults require more than a routine component change. Viraj IT provides motherboard fault diagnosis and chip-level repair assessment for eligible issues, helping customers explore repair possibilities before deciding on replacement.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm sm:text-base text-[#0f0e17] font-bold border-t border-[#ded7e0] pt-3">
                <span className="text-[#15803d] font-black text-lg">✓</span>
                <span>Motherboard fault diagnosis &amp; schematic tracing</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base text-[#0f0e17] font-bold border-t border-[#ded7e0] pt-3">
                <span className="text-[#15803d] font-black text-lg">✓</span>
                <span>Chip-level IC repair and BGA rework assessment</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base text-[#0f0e17] font-bold border-t border-[#ded7e0] pt-3">
                <span className="text-[#15803d] font-black text-lg">✓</span>
                <span>Transparent repair options and estimates based on findings</span>
              </li>
            </ul>

            <div className="pt-3">
              <a
                href={motherboardWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-3 min-h-[54px] px-7 py-3.5 rounded-full bg-[#b30c7a] hover:bg-[#97086a] text-white font-black text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-md shadow-[#b30c7a]/20"
              >
                <span>Enquire About Motherboard Repair</span>
                <span aria-hidden="true" className="text-lg leading-none">↗</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="w-full h-[360px] sm:h-[460px] rounded-[26px] overflow-hidden border border-[#ded7e0] bg-[#e4dce6] shadow-xl relative"
              role="img"
              aria-label="Genuine motherboard chip-level inspection photograph at Viraj IT"
            >
              <img
                src="/repair/motherboard repair_laptop repair page.png"
                alt="Viraj IT hardware engineer testing laptop motherboard with multimeter probes on workstation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 / THE REPAIR PROCESS (.process-section) */}
      <section
        id="process"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-10"
        aria-labelledby="process-title"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
            03 / THE REPAIR PROCESS
          </p>
          <h2
            id="process-title"
            className="text-3xl sm:text-4xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk']"
          >
            Know What Happens Next
          </h2>
          <p className="text-base sm:text-lg text-[#0f0e17] font-medium">
            A clear path from describing the problem to deciding on the recommended repair.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="relative border-t-[3px] border-[#d9c8d9] pt-6 space-y-2"
            >
              <span
                className="absolute -top-[7.5px] left-0 w-3 h-3 bg-[#b30c7a] rounded-full"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-sm font-black text-[#b30c7a] block">
                {step.number}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#0f0e17] font-['Space_Grotesk']">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-[#0f0e17] leading-relaxed font-medium">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>

        <p className="text-xs sm:text-sm text-[#0f0e17] font-semibold border-t border-[#ded7e0] pt-4">
          Diagnostic charges, repair timelines and warranty terms should be confirmed for each case.
        </p>
      </section>

      {/* 04 / REPAIR STORIES (.stories-section) */}
      <section
        id="stories"
        className="w-full bg-[#faf7fa] border-y border-[#ded7e0] py-16 sm:py-20"
        aria-labelledby="stories-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
                04 / REPAIR STORIES
              </p>
              <h2
                id="stories-title"
                className="text-3xl sm:text-4xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk']"
              >
                A Closer Look at Our Work
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#0f0e17] max-w-md font-medium">
              Real examples can show visitors the problems the team has worked on and how the repairs were handled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORIES.map((story, idx) => (
              <article
                key={idx}
                className="rounded-[20px] border border-[#ded7e0] bg-white overflow-hidden shadow-sm flex flex-col hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="h-56 relative overflow-hidden bg-[#e9e1e9]">
                  <img
                    src={story.image}
                    alt={story.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#b30c7a]">
                    {story.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#0f0e17] font-['Space_Grotesk']">
                    {story.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#0f0e17] leading-relaxed font-medium flex-1">
                    {story.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-dashed border-[#cbb9cb] bg-white flex flex-col sm:flex-row sm:items-center gap-3">
            <strong className="text-sm sm:text-base text-[#32123b] font-black shrink-0">
              Repair-specific Google reviews:
            </strong>
            <span className="text-xs sm:text-sm text-[#0f0e17] font-semibold">
              "Quick diagnosis and honest repair work on my Dell Inspiron motherboard without overcharging. Highly recommended!" — Verified Google Review
            </span>
          </div>
        </div>
      </section>

      {/* 05 / BUSINESS IT SUPPORT (.amc-section) */}
      <section
        id="business"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#ded7e0]"
        aria-labelledby="amc-title"
      >
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
            05 / BUSINESS IT SUPPORT
          </p>
          <h2
            id="amc-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk']"
          >
            More Than One Laptop to Maintain?
          </h2>
          <p className="text-base sm:text-lg text-[#0f0e17] leading-relaxed font-medium">
            For offices and businesses managing multiple computers, Viraj IT also offers computer and IT AMC discussions for ongoing maintenance requirements.
          </p>
        </div>

        <a
          href="https://virajit-dun.vercel.app/laptop-repair-store-in-mumbai#amc"
          className="inline-flex items-center justify-between gap-3 min-h-[50px] px-6 py-3 rounded-full border-[1.5px] border-[#c9bdcb] hover:border-[#b30c7a] bg-white text-[#0f0e17] hover:text-[#b30c7a] font-black text-sm whitespace-nowrap transition-all transform hover:-translate-y-0.5 shadow-sm"
        >
          <span>Explore Computer &amp; IT AMC</span>
          <span aria-hidden="true" className="text-lg leading-none">↗</span>
        </a>
      </section>

      {/* 06 / VISIT OUR REPAIR STORE (.visit-section) */}
      <section
        id="visit"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        aria-labelledby="visit-title"
      >
        <div className="p-8 sm:p-12 lg:p-14 rounded-[32px] sm:rounded-[40px] bg-[#32123b] text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#e5b3dc]">
              06 / VISIT OUR REPAIR STORE
            </p>
            <h2
              id="visit-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk'] leading-tight"
            >
              Laptop Repair Support in Kandivali West
            </h2>
            <p className="text-base sm:text-lg text-[#f1e9f2] leading-relaxed font-medium">
              Bring your laptop to Viraj IT or contact our team to discuss the problem before visiting.
            </p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1">
                <span className="block text-[11px] font-black uppercase tracking-[0.1em] text-[#e5b3dc]">
                  STORE ADDRESS
                </span>
                <strong className="text-base sm:text-lg text-white font-bold leading-relaxed block">
                  Viraj Infotech
                  <br />
                  Shop No. 4, Near Kandivali Railway Station,
                  <br />
                  S.V. Road, Kandivali West, Mumbai – 400067
                </strong>
              </div>

              <div className="space-y-1">
                <span className="block text-[11px] font-black uppercase tracking-[0.1em] text-[#e5b3dc]">
                  PHONE
                </span>
                <strong className="text-lg sm:text-xl text-white font-black block">
                  +91 89287 15729
                </strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://share.google/SCAKjT9NThGEm3CPB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-3 min-h-[50px] px-6 py-3 rounded-full bg-white text-[#32123b] hover:bg-slate-100 font-black text-sm transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                <span>Get Directions</span>
                <span aria-hidden="true" className="text-lg leading-none">↗</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button dark-outline dark-outline-btn inline-flex items-center justify-between gap-3 min-h-[50px] px-6 py-3 rounded-full border border-white/60 hover:border-white !text-white hover:!text-white font-black text-sm transition-all transform hover:-translate-y-0.5 hover:bg-white/10"
                style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.6)" }}
              >
                <span style={{ color: "#ffffff" }}>WhatsApp Repair Enquiry</span>
                <span aria-hidden="true" className="text-lg leading-none" style={{ color: "#ffffff" }}>↗</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-[#e5b3dc] font-semibold pt-1">
              Open Monday to Saturday: 10:30 AM – 8:30 PM
            </p>
          </div>

          <div className="lg:col-span-5">
            <div
              className="w-full h-[320px] sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#25092d] relative"
              role="img"
              aria-label="Viraj IT Computer & Laptop Repair Store in Kandivali West"
            >
              <img
                src="/repair/storefront image_visit store page.webp"
                alt="Viraj IT Computer & Laptop Storefront in Kandivali West, Mumbai"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 07 / GOOD TO KNOW (FAQS) (.faq) */}
      <section
        id="faq"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8"
        aria-labelledby="faq-title"
      >
        <div className="max-w-2xl space-y-2">
          <p className="text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-[#b30c7a]">
            07 / GOOD TO KNOW
          </p>
          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl font-black text-[#0f0e17] tracking-tight font-['Space_Grotesk']"
          >
            Repair FAQs
          </h2>
        </div>

        <div className="border-t border-[#ded7e0] divide-y divide-[#ded7e0]">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="group py-5 sm:py-6 cursor-pointer">
              <summary className="text-lg sm:text-xl font-bold text-[#0f0e17] list-none flex items-center justify-between gap-4 font-['Space_Grotesk'] select-none">
                <span>{faq.q}</span>
                <span className="text-[#b30c7a] font-black text-2xl transition-transform group-open:rotate-45 leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm sm:text-base text-[#0f0e17] leading-relaxed font-medium max-w-3xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Action matching Wireframe (.floating-wa) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#078c62] hover:bg-[#056e4d] text-white font-extrabold text-sm shadow-xl shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
      >
        <span>WhatsApp Repair</span>
        <span aria-hidden="true" className="text-base leading-none">↗</span>
      </a>
    </div>
  );
}
