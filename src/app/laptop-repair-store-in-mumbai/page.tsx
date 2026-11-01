import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Cpu,
  Monitor,
  BatteryCharging,
  HardDrive,
  ShieldCheck,
  Laptop,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Laptop Repair Store in Kandivali & Mumbai | Viraj Infotech",
  description:
    "Expert chip-level laptop repair store in Kandivali West, Mumbai. Skilled technicians, genuine parts, Laptop on Loan facility, and Corporate AMC.",
};

export default function LaptopRepairPage() {
  const repairServices = [
    {
      icon: Cpu,
      title: "Chip-Level Motherboard Repair",
      desc: "Advanced BGA & IC-level diagnostics for dead laptops, liquid damage, power IC failure, and no-display issues.",
    },
    {
      icon: Monitor,
      title: "Broken Screen & Hinge Replacement",
      desc: "Original FHD, HD, IPS & Touch Screen display replacements with same-day turnaround for Dell, HP, Lenovo, Acer, MSI & Apple.",
    },
    {
      icon: BatteryCharging,
      title: "Original Battery & Adapter Replacement",
      desc: "Genuine OEM batteries and chargers backed by store replacement warranty.",
    },
    {
      icon: HardDrive,
      title: "RAM & NVMe SSD Speed Upgrades",
      desc: "Make your slow laptop 5x faster with genuine SSD upgrades, thermal repasting, and OS optimization.",
    },
  ];

  const caseStudies = [
    {
      title: "Overheating or Clogged Fan",
      category: "Thermal Overhaul & Servicing",
      desc: "Thermal throttling, high fan noise, and sudden shutdowns. Our technician disassembles the cooling module, removes lint blockages, and reapplies high-conductivity thermal paste for peak cooling efficiency.",
      image: "/repair/overheating fan thermal repair.png",
      badge: "Same-Day Service",
    },
    {
      title: "Screen or Hinge Repair",
      category: "Display & Body Fabrication",
      desc: "Cracked displays, distorted pixels, and damaged structural hinge screw posts. We replace broken screens with original OEM panels and reconstruct anchor brackets with durable resin bonding.",
      image: "/repair/screen or hinge repair.png",
      badge: "Genuine OEM Panels",
    },
    {
      title: "SSD or RAM Upgrade",
      category: "Performance Expansion",
      desc: "Slow boot times and lag during heavy multitasking. Upgrading legacy hard drives to high-speed NVMe M.2 SSDs and expanding RAM delivers up to 5x faster read/write speeds with full OS data cloning.",
      image: "/repair/ssd or ram upgrade.png",
      badge: "Up to 5x Speed Boost",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-950">
      {/* Hero Banner with Genuine Technician Workshop Image */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-forest-900 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="px-3.5 py-1.5 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Laptop Repair Store in Kandivali • Mumbai
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Fast, Transparent Laptop Repair by Skilled Technicians
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Over two decades of hardware repair experience in Kandivali West. Unexpected restarts, display damage, charging faults, or slow performance? Get your laptop inspected with an upfront estimate before any work begins.
          </p>
          <div className="p-3.5 rounded-xl bg-forest-800/80 border border-white/10 text-xs sm:text-sm text-slate-200">
            Need your work to continue while we repair? Ask for our exclusive{" "}
            <strong className="text-lime-400">Laptop on Loan</strong> standby service!
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20need%20laptop%20repair%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Repair on WhatsApp</span>
            </a>
            <a
              href="tel:+918928715729"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call: +91 89287 15729</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-forest-800 relative aspect-[4/3]">
            <img
              src="/repair/laptop repair hero section.png"
              alt="Viraj IT Certified Hardware Repair Technician inspecting laptop motherboard in Kandivali workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-[11px] font-semibold text-white flex items-center justify-between">
              <span>Viraj IT Hardware Repair Lab</span>
              <span className="text-lime-400 font-black">Kandivali West</span>
            </div>
          </div>
        </div>
      </div>

      {/* Repair Services Grid */}
      <div className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600">
            01 / COMPONENT &amp; BOARD REPAIRS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
            What’s Wrong with Your Laptop?
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1">
            Common hardware problems our certified technicians diagnose and resolve across Dell, HP, Lenovo, Asus, Acer, Apple, and MSI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repairServices.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-brand-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <srv.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-950">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Expertise / Motherboard Section with Genuine Testing Photo */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600">
            02 / ADVANCED CHIP-LEVEL LAB
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950">
            Not Every Laptop Problem Needs Replacement.
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            Some laptop faults require more than routine component swapping. Viraj IT provides precision motherboard fault tracing, power IC repair, and chip-level micro-soldering assessment for eligible faults, helping customers explore economical repair options before deciding on costly replacements.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-950 font-bold pt-2">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Motherboard short circuit tracing &amp; BGA micro-soldering</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chip-level repair assessment for liquid damage &amp; dead laptops</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Clear diagnostic findings and upfront quote prior to approval</span>
            </li>
          </ul>
          <div className="pt-2">
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT,%20I'd%20like%20to%20ask%20about%20motherboard%20or%20chip-level%20laptop%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm shadow-md"
            >
              <span>Enquire About Motherboard Repair</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-slate-300 shadow-xl bg-slate-200 aspect-[4/3]">
            <img
              src="/repair/motherboard repair_laptop repair page.png"
              alt="Viraj IT engineer performing motherboard diagnostics and multimeter testing in Kandivali lab"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Case Studies / Documented Repair Stories with Generated Photos */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-600">
            03 / DOCUMENTED REPAIR STORIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
            A Closer Look at Our Workshop Repairs
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1">
            Real documented repairs showcasing the mechanical and board problems our technical team handles every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col hover:border-brand-300 transition-all hover:-translate-y-1"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider">
                  {cs.badge}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-600">
                    {cs.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-950">{cs.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {cs.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Visit Section with Storefront Photo */}
      <div className="p-8 sm:p-10 rounded-3xl bg-forest-900 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-lime-400">
            04 / VISIT OUR SERVICE LAB
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Visit Viraj IT Store in Kandivali West
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Bring your laptop directly to our service lab for instant inspection or contact our hardware engineers ahead of time.
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <span>
                <strong>Viraj Infotech:</strong> Shop No. 4, Near Kandivali Railway Station, S.V. Road, Kandivali West, Mumbai – 400067
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Monday – Saturday: 10:30 AM to 8:30 PM</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://share.google/SCAKjT9NThGEm3CPB"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm"
            >
              Get Directions ↗
            </a>
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT,%20I'm%20coming%20for%20a%20laptop%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm"
            >
              WhatsApp Us ↗
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg aspect-[4/3]">
            <img
              src="/repair/storefront image_visit store page.webp"
              alt="Viraj IT Computer & Laptop Storefront in Kandivali West"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Laptop AMC Section */}
      <div
        id="amc"
        className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600">
            CORPORATE &amp; OFFICE SUPPORT
          </span>
          <h2 className="text-2xl font-black text-slate-950">
            Annual Maintenance Contracts (Laptop AMC)
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
            Keep your office laptops running at peak performance with preventive maintenance, priority on-site support across Mumbai, and standby loaner laptops.
          </p>
        </div>
        <Link
          href="/virajit-laptop-store-kandivali-west"
          className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs sm:text-sm shrink-0"
        >
          Visit Kandivali Store →
        </Link>
      </div>
    </div>
  );
}
