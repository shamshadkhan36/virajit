import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Brand Laptop Store in Kandivali West | Viraj IT",
  description:
    "Explore Dell, Acer, MSI and Epson products at Viraj IT in Kandivali West, Mumbai. Authorised partner with genuine brand warranty, local advice, and hands-on demos.",
};

export default function LaptopBrandsPage() {
  const brandCards = [
    {
      id: "dell",
      name: "Dell",
      type: "LAPTOPS",
      desc: "Laptops for business and everyday computing.",
      credential: "Authorised DELL Loyalty Partner",
      whatsappText:
        "Hi Viraj IT, I'm interested in Dell laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="36"
            fontFamily="'Space Grotesk', Arial, sans-serif"
            fontWeight="900"
            fontSize="38"
            fill="#0076CE"
            textAnchor="middle"
            letterSpacing="-0.03em"
          >
            DELL
          </text>
        </svg>
      ),
    },
    {
      id: "acer",
      name: "Acer",
      type: "LAPTOPS",
      desc: "Laptops for work, study and everyday use.",
      credential: "Authorised ACER Laptop Dealer",
      whatsappText:
        "Hi Viraj IT, I'm interested in Acer laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="36"
            fontFamily="'Space Grotesk', Arial, sans-serif"
            fontWeight="800"
            fontSize="38"
            fill="#83B81A"
            textAnchor="middle"
            letterSpacing="-0.02em"
          >
            acer
          </text>
        </svg>
      ),
    },
    {
      id: "msi",
      name: "MSI",
      type: "LAPTOPS",
      desc: "Gaming and high-performance laptops.",
      credential: "Authorised MSi Royal Partner",
      whatsappText:
        "Hi Viraj IT, I'm interested in MSI laptops. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(14, 6)">
            <path
              d="M12 2C6 5 2 12 2 18C2 28 12 36 12 36C12 36 22 28 22 18C22 12 18 5 12 2Z"
              fill="#ED1C24"
            />
            <path
              d="M12 6C9 9 7 13 8 18C10 21 13 22 15 20C17 18 16 14 14 13"
              stroke="#FFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <text
              x="76"
              y="27"
              fontFamily="'Space Grotesk', Arial, sans-serif"
              fontWeight="900"
              fontStyle="italic"
              fontSize="34"
              fill="#111"
              textAnchor="middle"
              letterSpacing="-0.02em"
            >
              msi
            </text>
          </g>
        </svg>
      ),
    },
    {
      id: "epson",
      name: "Epson",
      type: "PRINTERS",
      desc: "Printers for home and business.",
      credential: "Authorised Epson Certified Channel Partner",
      whatsappText:
        "Hi Viraj IT, I'm interested in Epson printers. Please share the available options.",
      logo: (
        <svg viewBox="0 0 160 48" fill="none" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="36"
            fontFamily="'Space Grotesk', Arial, sans-serif"
            fontWeight="900"
            fontSize="36"
            fill="#003399"
            textAnchor="middle"
            letterSpacing="-0.01em"
          >
            EPSON
          </text>
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      icon: "▤",
      title: "Business & Office",
      desc: "Fast boot times, lightweight builds, and robust security for professional and enterprise work.",
    },
    {
      icon: "✳",
      title: "Students & Learning",
      desc: "Reliable battery life, clear displays, and smooth multitasking for coding, research, and classes.",
    },
    {
      icon: "⌁",
      title: "Gaming & Performance",
      desc: "Dedicated NVIDIA GeForce RTX graphics, high-refresh-rate displays, and superior thermal cooling.",
    },
    {
      icon: "⌂",
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
      q: "Which laptop brands are available at Viraj IT?",
      a: (
        <>
          Viraj IT is an authorised partner and official dealer for Dell, Acer, and MSI laptops, as well as Epson printers. All new devices come with genuine manufacturer warranty and invoice.
        </>
      ),
    },
    {
      q: "Does Viraj IT sell new and refurbished laptops?",
      a: (
        <>
          Yes. We offer brand new laptops with official manufacturer warranty, as well as thoroughly tested refurbished laptops with up to 3 years warranty at budget-friendly prices in our{" "}
          <Link href="/#shop" className="text-[#b30c7a] font-bold underline hover:text-[#97086a]">
            refurbished laptop section
          </Link>
          .
        </>
      ),
    },
    {
      q: "Can I enquire about a specific model or configuration?",
      a: (
        <>
          Yes! WhatsApp our store team at{" "}
          <a href="https://wa.me/918928715729" target="_blank" rel="noopener noreferrer" className="text-[#b30c7a] font-bold underline hover:text-[#97086a]">
            +91 89287 15729
          </a>{" "}
          with the exact model or requirements (CPU, RAM, GPU, display size) and we will check stock and best pricing for you.
        </>
      ),
    },
    {
      q: "Does Viraj IT offer MSI gaming laptops?",
      a: (
        <>
          Yes, as an Authorised MSI Royal Partner, we offer genuine MSI gaming series laptops (Thin, Katana, Bravo, Raider) with full MSI warranty, genuine Windows, and service assistance.
        </>
      ),
    },
    {
      q: "Are Epson printers available at the store?",
      a: (
        <>
          Yes, as an Authorised Epson Certified Channel Partner, we supply original Epson EcoTank ink tank printers for home, school, photography, and office commercial printing.
        </>
      ),
    },
    {
      q: "Can I visit the store to test laptops before purchasing?",
      a: (
        <>
          Absolutely. You can visit our store at Shop No. 31, Shreeji Darshan Building, Shantilal Modi Road, Kandivali West, Mumbai to see and test available laptops hands-on.
        </>
      ),
    },
    {
      q: "Are EMI options available?",
      a: (
        <>
          Yes, credit card EMI, debit card EMI, and no-cost EMI options are available on eligible models. Please check with our store executives during your visit or over WhatsApp.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0f0e17] font-sans antialiased">
      {/* Shell / Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-6 pb-2 text-[0.82rem] font-bold text-[#0f0e17] flex items-center gap-2">
          <Link href="/" className="hover:text-[#b30c7a] transition-colors">
            Home
          </Link>
          <span className="text-[#888] font-normal" aria-hidden="true">/</span>
          <span className="text-[#0f0e17]">Laptop Brands</span>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-11 items-center pt-8 pb-3" aria-labelledby="page-title">
          <div className="lg:col-span-7 space-y-4">
            <p className="flex items-center gap-2.5 text-[#b30c7a] text-[0.74rem] font-black uppercase tracking-[0.14em]">
              <span className="w-5 h-[2px] bg-[#b30c7a] inline-block" />
              Your Local Multi-Brand Technology Store
            </p>
            <h1
              id="page-title"
              className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-[#0f0e17] tracking-tight leading-[1.08]"
            >
              Multi-Brand Laptop &amp; Printer Store in{" "}
              <em className="not-italic text-[#b30c7a]">Kandivali West</em>
            </h1>
            <p className="text-base sm:text-[1.08rem] text-[#0f0e17] font-medium leading-relaxed max-w-2xl pt-1">
              Explore Dell, Acer, MSI and Epson products at Viraj IT. Whether you need a laptop for work, studies, everyday use or high-performance gaming, our team helps you explore suitable options with genuine brand warranty.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-3">
              <a
                href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27m%20looking%20for%20a%20laptop%20or%20printer.%20Please%20share%20the%20current%20options."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-[#b30c7a] hover:bg-[#97086a] text-white font-extrabold text-[0.95rem] shadow-[0_10px_24px_rgba(179,12,122,0.28)] hover:shadow-[0_12px_28px_rgba(179,12,122,0.36)] transition-all flex items-center gap-1.5"
              >
                <span>Enquire on WhatsApp</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-transparent hover:bg-slate-50 text-[#32123b] font-extrabold text-[0.95rem] border-2 border-[#32123b] transition-all flex items-center gap-1.5"
              >
                <span>Visit Store</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="text-xs sm:text-[0.85rem] font-bold text-[#0f0e17] pt-1">
              Official dealer and authorised partner for leading laptop and printer brands.
            </p>
          </div>

          {/* Hero Art / Image */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[440px] rounded-[26px] overflow-hidden bg-[#f6eff5] border border-[#efe0ec] shadow-lg">
            <Image
              src="/brands/hero-new-laptops.png"
              alt="Multi-brand new laptops and printers showcase at Viraj IT Kandivali"
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>

        {/* Section 01 / AUTHORISED PARTNERS */}
        <section id="brands" className="pt-3 pb-12" aria-labelledby="brands-title">
          <div className="space-y-2 mb-8">
            <p className="text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#b30c7a]">
              01 / AUTHORISED PARTNERS
            </p>
            <h2 id="brands-title" className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0f0e17] tracking-tight">
              Explore Our Brands
            </h2>
            <p className="text-base sm:text-[1.05rem] text-[#0f0e17] max-w-2xl leading-relaxed">
              Tell us the brand you have in mind. Our team can discuss current options and help you choose a suitable laptop or printer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandCards.map((b) => (
              <article
                key={b.id}
                className="bg-white border-[1.5px] border-[#ded7e0] rounded-[20px] shadow-[0_18px_50px_rgba(39,16,46,0.08)] hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col overflow-hidden"
              >
                <div className="h-[110px] bg-[#faf6f9] border-b-[1.5px] border-[#ded7e0] flex items-center justify-center p-5">
                  {b.logo}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#b30c7a]">
                      {b.type}
                    </p>
                    <h3 className="text-2xl font-black text-[#0f0e17]">{b.name}</h3>
                    <p className="text-[0.95rem] text-[#0f0e17] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <span className="text-[0.85rem] font-extrabold text-[#166534] bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-2.5 py-1.5 inline-block">
                      {b.credential}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/918928715729?text=${encodeURIComponent(b.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border-t border-[#ded7e0] text-[0.88rem] font-extrabold text-[#b30c7a] hover:bg-[#faf6f9] flex items-center justify-between transition-colors bg-white"
                >
                  <span>Enquire about {b.name}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Section 02 / YOUR NEEDS - Full width blush banner matching wireframe */}
      <section id="needs" className="bg-[#faf5f9] border-y border-[#ded7e0] py-16" aria-labelledby="needs-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-9">
            <div className="lg:col-span-8 space-y-2">
              <p className="text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#b30c7a]">
                02 / YOUR NEEDS
              </p>
              <h2 id="needs-title" className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0f0e17] tracking-tight">
                Find the Right Laptop for Your Needs
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm sm:text-base text-[#0f0e17] leading-relaxed">
                Start with how you plan to use it. We will help you compare specifications and pricing across models.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u, idx) => (
              <article
                key={idx}
                className="bg-white border-[1.5px] border-[#ded7e0] rounded-[18px] p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[rgba(179,12,122,0.08)] text-[#b30c7a] flex items-center justify-center font-black text-xl mb-4">
                  <span aria-hidden="true">{u.icon}</span>
                </div>
                <h3 className="text-xl font-black text-[#0f0e17] mb-2">{u.title}</h3>
                <p className="text-[0.92rem] text-[#0f0e17] leading-relaxed">{u.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%20need%20help%20choosing%20a%20laptop.%20Can%20you%20guide%20me%20based%20on%20my%20requirements%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.95rem] font-extrabold text-[#b30c7a] hover:text-[#97086a] underline underline-offset-4"
            >
              <span>Need help choosing? Chat with our team</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container Continued */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 03 / CONFIDENCE (Why Buy from Viraj IT?) */}
        <section id="why" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-16" aria-labelledby="why-title">
          {/* Photo Placeholder matching wireframe with mom and son photo */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[500px] lg:h-[520px] rounded-[26px] overflow-hidden bg-[#f0e6ef] border border-[#ded7e0] shadow-md">
            <Image
              src="/brands/mom-son-gaming-laptop.png"
              alt="Customer purchasing MSI gaming laptop at Viraj IT Kandivali store"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#b30c7a]">
              03 / CONFIDENCE
            </p>
            <h2 id="why-title" className="text-2xl sm:text-4xl lg:text-[2.7rem] font-black text-[#0f0e17] tracking-tight">
              Why Buy from Viraj IT?
            </h2>
            <p className="text-base sm:text-[1.05rem] text-[#0f0e17] leading-relaxed pb-2">
              Get help from a local team when choosing a laptop or printer for your needs.
            </p>

            <div className="space-y-4 pt-1">
              {whyPoints.map((pt) => (
                <div
                  key={pt.num}
                  className="flex items-start gap-5 p-4 sm:p-5 rounded-[16px] bg-white border-[1.5px] border-[#ded7e0] shadow-sm"
                >
                  <span className="text-[1.15rem] font-black text-[#b30c7a] font-mono shrink-0 pt-0.5">
                    {pt.num}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-[1.1rem] font-extrabold text-[#0f0e17]">{pt.title}</h3>
                    <p className="text-[0.92rem] text-[#0f0e17] leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 04 / VISIT STORE - Gradient banner with embedded map */}
        <section
          id="visit"
          className="my-10 rounded-[28px] bg-gradient-to-br from-[#1c0a22] via-[#2e1039] to-[#441352] text-white p-6 sm:p-10 lg:p-14 shadow-2xl"
          aria-labelledby="visit-title"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#f472b6]">
                04 / VISIT STORE
              </p>
              <h2 id="visit-title" className="text-2xl sm:text-4xl lg:text-[2.7rem] font-black text-white tracking-tight">
                Visit Viraj IT in Kandivali West
              </h2>
              <p className="text-sm sm:text-base text-[#e9d5e8] leading-relaxed">
                See the laptops in person, compare models side-by-side, and discuss your requirements directly with our experts.
              </p>

              <div className="space-y-4 pt-2">
                <div className="pb-4 border-b border-white/10">
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#f472b6] block mb-1">
                    STORE ADDRESS
                  </span>
                  <strong className="block text-lg sm:text-[1.2rem] font-extrabold text-white">
                    Viraj Infotech
                  </strong>
                  <small className="block text-[0.88rem] text-[#e9d5e8] leading-relaxed mt-1">
                    Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.
                  </small>
                </div>

                <div className="pb-4 border-b border-white/10">
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#f472b6] block mb-1">
                    PHONE &amp; WHATSAPP
                  </span>
                  <strong className="block text-lg sm:text-[1.2rem] font-extrabold text-white">
                    +91 89287 15729
                  </strong>
                </div>

                <div className="pb-2">
                  <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#f472b6] block mb-1">
                    STORE TIMINGS
                  </span>
                  <small className="block text-[0.88rem] text-[#e9d5e8]">
                    Mon–Sat: 10:00 AM – 8:30 PM &nbsp;|&nbsp; Sun: 11:00 AM – 6:00 PM
                  </small>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 rounded-full bg-white hover:bg-slate-100 text-[#32123b] font-extrabold text-[0.95rem] shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Get Directions</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="tel:+918928715729"
                  className="button dark-outline dark-outline-btn px-7 py-3 rounded-full bg-transparent hover:bg-white/10 !text-white font-extrabold text-[0.95rem] border-[1.5px] border-white/60 hover:border-white transition-all flex items-center gap-1.5"
                  style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.6)" }}
                >
                  <span style={{ color: "#ffffff" }}>Call Store</span>
                  <span aria-hidden="true" style={{ color: "#ffffff" }}>↗</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed matching wireframe */}
            <div className="lg:col-span-6 h-[340px] sm:h-[400px] rounded-[22px] overflow-hidden bg-[#220b29] shadow-inner">
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
          </div>
        </section>

        {/* Section 05 / COMMON QUESTIONS (FAQ) */}
        <section id="faq" className="py-16" aria-labelledby="faq-title">
          <div className="space-y-2 mb-8">
            <p className="text-[0.74rem] font-black uppercase tracking-[0.14em] text-[#b30c7a]">
              05 / COMMON QUESTIONS
            </p>
            <h2 id="faq-title" className="text-2xl sm:text-4xl lg:text-[2.6rem] font-black text-[#0f0e17] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border-t-[1.5px] border-[#ded7e0]">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border-b-[1.5px] border-[#ded7e0] py-5 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-black text-[1.05rem] text-[#0f0e17] group-open:text-[#b30c7a] transition-colors list-none">
                  <span>{faq.q}</span>
                  <span className="text-[#b30c7a] font-extrabold text-2xl transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[0.95rem] text-[#0f0e17] font-medium leading-[1.65] max-w-4xl">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
