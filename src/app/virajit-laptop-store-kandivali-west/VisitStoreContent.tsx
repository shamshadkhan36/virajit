"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Laptop,
  Printer,
  Wrench,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";

const STORE_ADDRESS =
  "Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali West, Mumbai, Maharashtra 400067.";

export const VisitStoreContent: React.FC = () => {
  const [copyStatus, setCopyStatus] = useState<string>("");

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(STORE_ADDRESS);
      setCopyStatus("Store address copied to clipboard!");
      setTimeout(() => {
        setCopyStatus("");
      }, 4000);
    } catch {
      setCopyStatus("Please select and copy the address text manually.");
      setTimeout(() => {
        setCopyStatus("");
      }, 4000);
    }
  };

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="shell breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Visit Our Store</span>
      </div>

      {/* HERO SECTION WITH GENUINE STOREFRONT PHOTO */}
      <section className="store-hero shell" aria-labelledby="page-title">
        <div className="store-hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line"></span>Visit Viraj IT • Kandivali West
          </p>
          <h1 id="page-title">
            Visit Our Store in <em>Kandivali West</em>
          </h1>
          <p className="lead">
            Explore tested refurbished laptops, leading branded laptops, printers,
            and get prompt technical help with laptop repairs — all in person at
            our local store.
          </p>

          <div className="identity-card">
            <div>
              <strong>Viraj Infotech</strong>
              <span>Kandivali West, Mumbai</span>
            </div>
            <p>
              Shop no 31, Ground Floor, Shreeji Darshan Building, Shantilal Modi
              Road, Near Bata Showroom, Kandivali, Bhagat Colony, Kandivali
              West, Mumbai, Maharashtra 400067.
            </p>
            <small>
              Use the directions link for the verified store pin supplied by
              Viraj IT.
            </small>
          </div>

          <div className="hero-actions">
            <a
              className="button primary"
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get Directions</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button outline" href="tel:+918928715729">
              <span>Call Store</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            className="under-link"
            href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27m%20planning%20to%20visit%20your%20Kandivali%20West%20store.%20Please%20confirm%20your%20location%20and%20hours."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us ↗
          </a>

          <div className="hours-line">
            <span className="hours-dot" aria-hidden="true"></span>
            <strong>Published store hours:</strong>
            <span>
              Mon–Sat 10:00 AM–8:30 PM &nbsp;•&nbsp; Sun 11:00 AM–6:00 PM
            </span>
          </div>
          <p className="action-status" role="status" aria-live="polite"></p>
        </div>

        {/* Real storefront image per instructions */}
        <div
          className="storefront-slot relative"
          role="img"
          aria-label="Genuine Viraj IT storefront photograph with visible signboard"
        >
          <Image
            src="/store/storefront.webp"
            alt="Viraj IT storefront with visible signboard on Shantilal Modi Road, Kandivali West"
            fill
            className="object-cover"
            priority
          />
          <div className="storefront-badge">
            <strong>Viraj IT Storefront</strong>
            <span>Shantilal Modi Road, Kandivali West</span>
          </div>
        </div>
      </section>

      {/* SECTION 01: STORE LOCATION & INTERACTIVE GOOGLE MAP */}
      <section className="location-section" id="location" aria-labelledby="location-title">
        <div className="shell">
          <div className="section-heading narrow">
            <p className="eyebrow">01 / STORE LOCATION</p>
            <h2 id="location-title">Easy to Find. Easy to Visit.</h2>
            <p>
              Find Viraj IT on Shantilal Modi Road in Bhagat Colony, Kandivali
              West, near Bata Showroom. Use the linked Google Maps listing for
              the exact route.
            </p>
          </div>

          <div className="location-grid">
            <div className="address-card">
              <span className="card-eyebrow">STORE ADDRESS</span>
              <h3>Viraj Infotech</h3>
              {/* Corrected address without 'Shanti lal,' on line 2 per instructions */}
              <address>
                Shop no 31, Ground Floor,
                <br />
                Shreeji Darshan Building,
                <br />
                Shantilal Modi Road, Near Bata Showroom,
                <br />
                Kandivali, Bhagat Colony, Kandivali West,
                <br />
                Mumbai, Maharashtra 400067.
              </address>

              <dl>
                <div>
                  <dt>Call</dt>
                  <dd>
                    <a href="tel:+918928715729">+91 89287 15729</a>
                  </dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a
                      href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20please%20confirm%20your%20store%20location."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Message Store ↗
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Store Hours</dt>
                  <dd>
                    Mon–Sat 10:00 AM–8:30 PM
                    <br />
                    Sun 11:00 AM–6:00 PM
                  </dd>
                </div>
              </dl>

              <div className="address-actions">
                <a
                  className="button primary"
                  href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get Directions</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <button
                  className="button outline flex items-center justify-between"
                  type="button"
                  id="copy-address"
                  onClick={handleCopyAddress}
                >
                  <span>{copyStatus ? "Copied!" : "Copy Address"}</span>
                  {copyStatus ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 shrink-0" />
                  )}
                </button>
              </div>
              <p className="address-note">
                Address and Maps listing supplied by Viraj IT. Reconfirm opening
                hours before travelling.
              </p>
              {copyStatus && (
                <p className="copy-status" role="status" aria-live="polite">
                  {copyStatus}
                </p>
              )}
            </div>

            <div className="map-slot" aria-label="Google Maps directions">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.8641568220833!2d72.84362103670237!3d19.201134708472352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7625f004dc9%3A0xb8ceba952c49cbad!2sVirajIT%20Mumbai%20%7C%20Laptop%20Repair%20and%20Refurbished%20Laptop%20Store!5e0!3m2!1sen!2sin!4v1792837979716!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Viraj IT Store on Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: INSIDE OUR STORE (GENUINE GALLERY PHOTOS) */}
      <section className="section shell" id="gallery" aria-labelledby="gallery-title">
        <div className="section-heading narrow">
          <p className="eyebrow">02 / INSIDE OUR STORE</p>
          <h2 id="gallery-title">Take a Look Before You Visit.</h2>
          <p>
            See our Kandivali West store, explore the shopping environment, and
            get a feel for where our team welcomes customers.
          </p>
        </div>

        {/* Real store photos placed into the gallery slots */}
        <div className="gallery-grid" aria-label="Genuine store photographs">
          <div className="gallery-slot featured relative">
            <Image
              src="/store/storefront.webp"
              alt="Viraj IT storefront with visible signboard on Shantilal Modi Road"
              fill
              className="object-cover"
            />
            <div className="gallery-slot-caption">
              <span>01 / STOREFRONT &amp; SIGNAGE</span>
              <strong>Visible Signage on Shantilal Modi Road</strong>
            </div>
          </div>
          <div className="gallery-slot relative">
            <Image
              src="/store/store-inside.png"
              alt="Inside Viraj IT store - Dell and HP laptop display shelves"
              fill
              className="object-cover"
            />
            <div className="gallery-slot-caption">
              <span>02 / LAPTOP DISPLAY &amp; DEMO COUNTER</span>
              <strong>Genuine Dell &amp; HP Laptop Display Shelves</strong>
            </div>
          </div>
        </div>
        <p className="gallery-note">
          Real photographs of Viraj IT store in Kandivali West, Mumbai.
        </p>
      </section>

      {/* SECTION 03: PRODUCTS & SERVICES */}
      <section className="service-section" id="services" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-heading narrow">
            <p className="eyebrow">03 / PRODUCTS &amp; SERVICES</p>
            <h2 id="services-title">There&apos;s More to Explore at Viraj IT.</h2>
            <p>
              Whether you&apos;re planning to buy a laptop or need technical
              assistance, our store team can help you explore the available
              options.
            </p>
          </div>
          <div className="service-grid">
            <article>
              <span className="service-icon" aria-hidden="true">
                <Laptop className="w-6 h-6 text-[#b30c7a]" />
              </span>
              <div>
                <h3>Refurbished Laptops</h3>
                <p>
                  Explore professionally tested refurbished laptops across
                  different budgets and requirements.
                </p>
                <Link href="/refurbished-laptops-catalogue">
                  Explore Refurbished Laptops ↗
                </Link>
              </div>
            </article>
            <article>
              <span className="service-icon" aria-hidden="true">
                <Printer className="w-6 h-6 text-[#b30c7a]" />
              </span>
              <div>
                <h3>New Laptops &amp; Printers</h3>
                <p>
                  Enquire about Dell, Acer, MSI and Epson products available
                  through our store.
                </p>
                <Link href="/refurbished-laptops-catalogue">
                  Explore Our Brands ↗
                </Link>
              </div>
            </article>
            <article>
              <span className="service-icon" aria-hidden="true">
                <Wrench className="w-6 h-6 text-[#b30c7a]" />
              </span>
              <div>
                <h3>Laptop Repair &amp; Upgrades</h3>
                <p>
                  Discuss startup issues, hardware faults, screen damage,
                  batteries and upgrades.
                </p>
                <Link href="/laptop-repair-store-in-mumbai">
                  Explore Repair Services ↗
                </Link>
              </div>
            </article>
            <article>
              <span className="service-icon" aria-hidden="true">
                <ShieldCheck className="w-6 h-6 text-[#b30c7a]" />
              </span>
              <div>
                <h3>IT AMC &amp; CCTV Services</h3>
                <p>
                  Enquire about business or society requirements; a separate site
                  assessment may be needed.
                </p>
                <Link href="/laptop-repair-store-in-mumbai#amc">
                  Explore IT Services ↗
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 04: LOCAL TRUST & UPDATED GOOGLE REVIEWS */}
      <section className="section shell trust-section-local" id="trust" aria-labelledby="trust-title">
        <div className="section-heading narrow">
          <p className="eyebrow">04 / LOCAL TRUST. GENUINE RELATIONSHIPS.</p>
          <h2 id="trust-title">A Store You Can Visit. People You Can Meet.</h2>
          <p>
            Buying a laptop or arranging technical support is easier when you
            can speak directly with a local team.
          </p>
        </div>

        <div className="trust-strip">
          <div>
            <span>01</span>
            <strong>Physical Store</strong>
            <p>Visit and speak with the Kandivali West team in person.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Brand Associations</strong>
            <p>Authorised partner credentials and multi-brand retail.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Customer Reviews</strong>
            <p>
              Read authentic 5-star Google experiences from our customers.
            </p>
          </div>
          <div>
            <span>04</span>
            <strong>Buying Assistance</strong>
            <p>Discuss configurations hands-on before deciding.</p>
          </div>
        </div>

        {/* REVIEWS BOX UPDATED WITH EXACT REVIEWS FROM INSTRUCTIONS */}
        <div className="reviews-box">
          <div className="reviews-lead">
            <span>GOOGLE REVIEWS</span>
            <h3>Real customer experiences belong here.</h3>
            <p>
              Verified reviews from customers who purchased hardware and
              received services at Viraj IT.
            </p>
            <a
              className="btn-g-link"
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps ↗
            </a>
          </div>

          <div className="review-slots">
            {/* Keshav Lad review per docx instructions */}
            <article className="review-item">
              <div>
                <div className="review-header">
                  <div className="review-avatar-mini relative">
                    <Image
                      src="/reviews/keshav.png"
                      alt="Keshav Lad"
                      width={42}
                      height={42}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <strong>Keshav Lad</strong>
                    <span className="r-meta">
                      2 reviews • 0 photos • 3 hours ago{" "}
                      <span className="badge-new">NEW</span>
                    </span>
                  </div>
                </div>
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>
                  &ldquo;We bought all hardware from viraj infotech for our school
                  kes international they keep all product ready and service is
                  very fast. Highly recommended for all accessories like adapter,
                  mouse keyboard etc&rdquo;
                </p>
              </div>
            </article>

            {/* Karan K review per docx instructions */}
            <article className="review-item">
              <div>
                <div className="review-header">
                  <div className="review-avatar-mini relative">
                    <Image
                      src="/reviews/karan.png"
                      alt="Karan K"
                      width={42}
                      height={42}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <strong>Karan K</strong>
                    <span className="r-meta">
                      1 review • 0 photos • 4 weeks ago{" "}
                      <span className="badge-new">NEW</span>
                    </span>
                  </div>
                </div>
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <p>
                  &ldquo;Very healpful and Polite. Prices are very reasonable.
                  Highly recommended for customer satisfaction and after sales
                  service.&rdquo;
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 05: FAQ */}
      <section className="faq-section" id="before-you-visit" aria-labelledby="faq-title">
        <div className="shell">
          <div className="section-heading narrow">
            <p className="eyebrow">05 / PLAN YOUR VISIT</p>
            <h2 id="faq-title">A Few Things Worth Knowing.</h2>
            <p>
              Planning to visit for a particular laptop, printer or repair
              requirement? A quick enquiry can help you prepare.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>Can I check laptop availability before visiting?</summary>
              <p>
                Yes. Contact the team on WhatsApp or by phone to ask about
                currently available laptops, printers and configurations.
              </p>
            </details>
            <details>
              <summary>Can I see refurbished laptops in person?</summary>
              <p>
                Visit the store to enquire about and examine available
                refurbished laptops before deciding on a purchase.
              </p>
            </details>
            <details>
              <summary>Can I bring my laptop for repair?</summary>
              <p>
                Yes. Contact the store or visit to discuss the issue and the next
                steps for diagnosis.
              </p>
            </details>
            <details>
              <summary>What landmark should I look for?</summary>
              <p>
                The store address is on Shantilal Modi Road, near Bata Showroom
                in Kandivali West. Use the Google Maps directions link for the
                exact route.
              </p>
            </details>
            <details>
              <summary>Can I visit for IT AMC or CCTV enquiries?</summary>
              <p>
                Yes. Discuss your requirement with the team; a separate site
                assessment may be needed for some projects.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* VISIT CLOSE SECTION */}
      <section className="visit-close" aria-labelledby="close-title">
        <div className="shell close-inner">
          <div>
            <p className="eyebrow">WE LOOK FORWARD TO SEEING YOU</p>
            <h2 id="close-title">Planning to Visit Viraj IT?</h2>
            <p>
              Find us in Kandivali West, or contact our team before visiting to
              check product availability and discuss your requirements.
            </p>
          </div>
          <div className="close-actions">
            <a
              className="button primary"
              href="https://maps.app.goo.gl/Ct4ewUbax8xj9UaB8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get Directions</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button outline" href="tel:+918928715729">
              <span>Call Store</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="under-link"
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27m%20planning%20a%20store%20visit.%20Please%20confirm%20your%20address%20and%20hours."
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
