import React from "react";
import Link from "next/link";
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-forest-900 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="px-3 py-1 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider">
            Laptop Repair Store in Kandivali • Mumbai
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Fast, Transparent Laptop Repair by Skilled Technicians
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Over two decades of hardware repair experience in Kandivali West. Need your work to continue while we repair your laptop? Ask for our exclusive{" "}
            <strong className="text-lime-400">Laptop on Loan</strong> service!
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20Infotech,%20I%20need%20laptop%20repair%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Repair on WhatsApp</span>
            </a>
            <a
              href="tel:+918928715729"
              className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-black text-xs sm:text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call Support: +91 89287 15729</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 rounded-2xl bg-forest-800 border border-white/10 space-y-3">
          <div className="text-xs font-black uppercase tracking-wider text-lime-400">
            Why Repair With VirajIT?
          </div>
          <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Free In-Store Checkup &amp; Estimate</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Laptop on Loan Facility Available</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
              <span>Genuine Spare Parts with Warranty</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
              <span>20+ Years Trusted Kandivali Lab</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Repair Services Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Our Specialized Repair Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repairServices.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-cream-300 shadow-sm flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <srv.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">{srv.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Laptop AMC Section (Anchored from Footer Quick Links) */}
      <div
        id="amc"
        className="p-8 rounded-3xl bg-white border border-cream-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-brand-600">
            CORPORATE &amp; OFFICE SUPPORT
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Annual Maintenance Contracts (Laptop AMC)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
