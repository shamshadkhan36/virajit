import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Laptop,
  Briefcase,
  GraduationCap,
  Gamepad2,
  Home,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Multi-Brand New Laptop & Printer Store in Kandivali West | Viraj Infotech",
  description:
    "Authorised partner for Dell, Acer, MSI gaming laptops and Epson printers in Kandivali West, Mumbai. Official warranty, expert advice, and hands-on demos.",
};

export default function LaptopBrandsPage() {
  const brandCards = [
    {
      id: "dell",
      name: "Dell",
      type: "LAPTOPS",
      desc: "Laptops for business and everyday computing.",
      credential: "Authorised DELL Loyalty Partner",
      whatsappText: "Hi Viraj IT, I'm interested in Dell laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="36" fontFamily="'Space Grotesk', Arial, sans-serif" fontWeight="900" fontSize="38" fill="#0076CE" textAnchor="middle" letterSpacing="-0.03em">DELL</text>
        </svg>
      ),
    },
    {
      id: "acer",
      name: "Acer",
      type: "LAPTOPS",
      desc: "Laptops for work, study and everyday use.",
      credential: "Authorised ACER Laptop Dealer",
      whatsappText: "Hi Viraj IT, I'm interested in Acer laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="35" fontFamily="'Space Grotesk', Arial, sans-serif" fontWeight="900" fontSize="36" fill="#83B81A" textAnchor="middle" letterSpacing="-0.02em">acer</text>
        </svg>
      ),
    },
    {
      id: "msi",
      name: "MSI",
      type: "LAPTOPS",
      desc: "Gaming and high-performance laptops.",
      credential: "Authorised MSi Royal Partner",
      whatsappText: "Hi Viraj IT, I'm interested in MSI laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 180 50" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(14, 5)">
            <path d="M12 2L2 6V18C2 25 7 31 12 34C17 31 22 25 22 18V6L12 2Z" fill="#ED1C24"/>
            <path d="M12 5L5 8.5V17.5C5 23 9 28 12 30.5C15 28 19 23 19 17.5V8.5L12 5Z" fill="#111"/>
            <path d="M9 13C10 11 14 11 15 13C16 15 14 18 12 22C10 18 8 15 9 13Z" fill="#ED1C24"/>
          </g>
          <text x="110" y="34" fontFamily="'Space Grotesk', Arial, sans-serif" fontWeight="900" fontSize="34" fill="#ED1C24" textAnchor="middle" letterSpacing="0.05em">msi</text>
        </svg>
      ),
    },
    {
      id: "epson",
      name: "Epson",
      type: "PRINTERS",
      desc: "Printers for home and business.",
      credential: "Authorised Epson Certified Channel Partner",
      whatsappText: "Hi Viraj IT, I'm interested in Epson printers. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="36" fontFamily="'Space Grotesk', Arial, sans-serif" fontWeight="900" fontSize="36" fill="#003399" textAnchor="middle" letterSpacing="0.02em">EPSON</text>
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      icon: Briefcase,
      title: "Business & Office",
      desc: "Fast boot times, lightweight builds, and robust security for professional and enterprise work.",
    },
    {
      icon: GraduationCap,
      title: "Students & Learning",
      desc: "Reliable battery life, clear displays, and smooth multitasking for coding, research, and classes.",
    },
    {
      icon: Gamepad2,
      title: "Gaming & Performance",
      desc: "Dedicated NVIDIA GeForce RTX graphics, high-refresh-rate displays, and superior thermal cooling.",
    },
    {
      icon: Home,
      title: "Home & Everyday",
      desc: "Dependable laptops for browsing, family use, accounting, streaming, and personal productivity.",
    },
  ];

  const whyPoints = [
    {
      num: "01",
      title: "Leading Technology Brands",
      desc: "Explore laptops and printers from recognised manufacturers.",
    },
    {
      num: "02",
      title: "Brand Partnerships",
      desc: "Official dealer and authorised partner for leading laptop and printer brands.",
    },
    {
      num: "03",
      title: "Personalised Buying Assistance",
      desc: "Discuss your requirements with the Viraj IT team.",
    },
    {
      num: "04",
      title: "Local Store Support",
      desc: "Speak directly with the team in Kandivali West.",
    },
  ];

  const faqs = [
    {
      q: "Are these laptops brand new with official manufacturer warranty?",
      a: "Yes. All laptops in this multi-brand section are brand new, sealed units sourced directly through official brand distribution channels. Every laptop and printer includes full manufacturer warranty backed by Dell, Acer, MSI, or Epson authorized service centers across India.",
    },
    {
      q: "Can I visit the Kandivali West store to see laptops before buying?",
      a: "Absolutely! We encourage you to visit our store in Kandivali West. You can inspect physical demo units, compare screen sizes and weights side-by-side, test keyboards, and discuss configurations directly with our hardware experts.",
    },
    {
      q: "Can you arrange a specific laptop model or custom configuration?",
      a: "Yes. As an authorised partner, we can check real-time distributor inventories and source specific laptop models, processor variants (Intel Core i5, i7, i9 or AMD Ryzen), RAM/SSD configurations, or specialised gaming/creator editions.",
    },
    {
      q: "Do you offer EMI or financing options on new laptops?",
      a: "Yes. We offer flexible credit card EMI, debit card EMI, and paperless consumer financing options through Snapmint and leading partner banks at our Kandivali West store.",
    },
    {
      q: "Do you also sell Epson printers and ink supplies?",
      a: "Yes. As an Authorised Epson Certified Channel Partner, we provide genuine Epson EcoTank all-in-one ink tank printers, replacement ink bottles, photo printers, and document scanners.",
    },
    {
      q: "How do I get advice or request a quote before visiting?",
      a: "Simply tap any of the WhatsApp enquiry buttons or call our store at +91 89287 15729. Share your budget, primary software, and work requirements, and our team will recommend the best options available.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 text-slate-900">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs font-bold text-slate-600 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-900 font-extrabold">Laptop Brands</span>
      </nav>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 pb-4">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-600" />
            Your Local Multi-Brand Technology Store
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            Multi-Brand Laptop &amp; Printer Store in{" "}
            <span className="text-brand-600">Kandivali West</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed max-w-2xl">
            Explore Dell, Acer, MSI and Epson products at Viraj IT. Whether you need a laptop for work, studies, everyday use or high-performance gaming, our team helps you explore suitable options with genuine brand warranty.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27m%20looking%20for%20a%20laptop%20or%20printer.%20Please%20share%20the%20current%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-black text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp ↗</span>
            </a>
            <a
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-cream-100 text-slate-900 font-black text-sm flex items-center gap-2 border border-slate-300 shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Visit Store ↗</span>
            </a>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            ✓ Official dealer and authorised partner for leading laptop and printer brands.
          </p>
        </div>

        {/* Hero Image */}
        <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-cream-200 border border-cream-300 shadow-xl">
          <Image
            src="/brands/hero-new-laptops.png"
            alt="Multi-brand new laptops and printers at Viraj IT Kandivali"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* Section 01 / Authorised Partners */}
      <section id="brands" className="pt-2 pb-6 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            01 / AUTHORISED PARTNERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Explore Our Brands
          </h2>
          <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-medium">
            Tell us the brand you have in mind. Our team can discuss current options and help you choose a suitable laptop or printer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandCards.map((b) => (
            <article
              key={b.id}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col overflow-hidden group"
            >
              <div className="h-32 bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100 group-hover:bg-brand-50/40 transition-colors">
                {b.logo}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-600">
                    {b.type}
                  </span>
                  <h3 className="text-2xl font-black text-slate-950">{b.name}</h3>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-extrabold text-slate-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b.credential}</span>
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/918928715729?text=${encodeURIComponent(b.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white hover:bg-brand-50 border-t border-slate-100 text-xs font-black text-brand-600 flex items-center justify-between transition-colors"
              >
                <span>Enquire about {b.name}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Section 02 / Popular Use Cases */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            02 / POPULAR USE CASES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Laptops for Every Need
          </h2>
          <p className="text-base text-slate-900 leading-relaxed font-medium">
            Whether you need a reliable work laptop, a lightweight student companion, or an NVIDIA GeForce RTX gaming powerhouse, we guide you to the right configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((u, idx) => {
            const Icon = u.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-black">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">{u.title}</h3>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">
                  {u.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <a
            href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%20need%20help%20choosing%20a%20laptop.%20Can%20you%20guide%20me%20based%20on%20my%20requirements%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black text-brand-600 hover:text-brand-700 underline underline-offset-4"
          >
            <span>Need help choosing? Chat with our team</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Section 03 / Why Buy from Viraj IT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-4">
        <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden bg-cream-200 border border-cream-300 shadow-xl">
          <Image
            src="/brands/mom-son-gaming-laptop.png"
            alt="Customer purchasing MSI gaming laptop at Viraj IT Kandivali store"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            03 / CONFIDENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Why Buy from Viraj IT?
          </h2>
          <p className="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
            Get help from a local team when choosing a laptop or printer for your needs.
          </p>

          <div className="space-y-4 pt-2">
            {whyPoints.map((pt) => (
              <div
                key={pt.num}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm"
              >
                <span className="text-sm font-black text-brand-600 pt-0.5">{pt.num}</span>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-950">{pt.title}</h3>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 / Visit Store */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-forest-950 via-slate-950 to-slate-950 text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-pink-300 block">
            04 / VISIT STORE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Visit Viraj IT in Kandivali West
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            See the laptops in person, compare models side-by-side, and discuss your requirements directly with our experts.
          </p>

          <div className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="border-t border-slate-800 pt-3">
              <span className="text-[10px] font-black uppercase text-pink-300 tracking-wider block">STORE ADDRESS</span>
              <p className="font-extrabold text-white text-sm mt-0.5">Viraj Infotech</p>
              <p className="text-slate-300 mt-0.5">
                Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <span className="text-[10px] font-black uppercase text-pink-300 tracking-wider block">PHONE &amp; WHATSAPP</span>
              <p className="font-extrabold text-white text-base mt-0.5">+91 89287 15729</p>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <span className="text-[10px] font-black uppercase text-pink-300 tracking-wider block">STORE TIMINGS</span>
              <p className="text-slate-300 mt-0.5">Mon–Sat: 10:00 AM – 8:30 PM &nbsp;|&nbsp; Sun: 11:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white hover:bg-cream-100 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
            >
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Get Directions ↗</span>
            </a>
            <a
              href="tel:+918928715729"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-pink-300" />
              <span>Call Store ↗</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 h-[380px] rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8641568220833!2d72.84362103670237!3d19.201134708472352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7625f004dc9%3A0xb8ceba952c49cbad!2sVirajIT%20Mumbai%20%7C%20Laptop%20Repair%20and%20Refurbished%20Laptop%20Store!5e0!3m2!1sen!2sin!4v1792837979716!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      {/* Section 05 / Common Questions (FAQ) */}
      <section className="space-y-8 pt-4 pb-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block">
            05 / COMMON QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-900 font-medium">
            Clear information about warranty, demo units, ordering, and customer support.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group py-5 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 font-black text-base sm:text-lg text-slate-950 list-none">
                <span>{faq.q}</span>
                <span className="text-brand-600 font-black text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm sm:text-base text-slate-900 font-medium leading-relaxed max-w-4xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
