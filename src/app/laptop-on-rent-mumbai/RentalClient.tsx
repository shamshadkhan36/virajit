"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RentalClient() {
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    quantity: "",
    use: "",
    duration: "",
    location: "",
    requirements: "",
  });

  const enquiryRef = useRef<HTMLElement>(null);
  const useSelectRef = useRef<HTMLSelectElement>(null);

  const handleScenarioClick = (useCase: string) => {
    setFormData((prev) => ({ ...prev, use: useCase }));
    if (enquiryRef.current) {
      enquiryRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      useSelectRef.current?.focus({ preventScroll: true });
    }, 420);
  };

  const handleScrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    if (enquiryRef.current) {
      enquiryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const organisation = formData.organisation.trim();
    const quantity = formData.quantity.trim();
    const use = formData.use.trim();
    const duration = formData.duration.trim();
    const location = formData.location.trim();
    const requirements = formData.requirements.trim();

    const lines = [
      "Hi Viraj IT, I would like to discuss a paid laptop rental quotation.",
      "",
      "Name: " + name,
      "Organisation: " + (organisation || "Not specified"),
      "Number of laptops: " + quantity,
      "Use case: " + use,
      "Expected duration: " + duration,
      "Use location: " + location,
      "Specifications / software: " + (requirements || "Please advise"),
      "",
      "Please let me know what options and terms are available.",
    ];

    const waUrl = "https://wa.me/918928715729?text=" + encodeURIComponent(lines.join("\n"));
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rent-page-wrapper">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

        .rent-page-wrapper {
          --ink: #0f0e17;
          --muted: #4b4453;
          --violet: #32123b;
          --pink: #b30c7a;
          --pink-deep: #97086a;
          --blush: #faf5f9;
          --line: #ded7e0;
          --paper: #ffffff;
          --shadow: 0 18px 50px rgba(39, 16, 46, 0.1);
          font-family: 'Manrope', Arial, sans-serif;
          color: var(--ink);
          background: var(--paper);
          font-size: 18px;
          line-height: 1.65;
          width: 100%;
        }

        .rent-page-wrapper h1,
        .rent-page-wrapper h2,
        .rent-page-wrapper h3 {
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
          color: #0c0b14;
        }

        .rent-page-wrapper .shell {
          width: min(1240px, calc(100% - 64px));
          margin-inline: auto;
        }

        .rent-page-wrapper .breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 26px;
          padding-bottom: 8px;
          font-size: 0.88rem;
          color: var(--muted);
          font-weight: 600;
        }
        .rent-page-wrapper .breadcrumb a:hover {
          text-decoration: underline;
          color: var(--pink);
        }

        .rent-page-wrapper .eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--pink);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.82rem;
          font-weight: 800;
          margin-bottom: 20px;
        }
        .rent-page-wrapper .eyebrow.light {
          color: #f49acf;
        }
        .rent-page-wrapper .eyebrow-line {
          width: 24px;
          height: 2px;
          background: var(--pink);
        }

        .rent-page-wrapper .rent-hero {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 56px;
          align-items: center;
          padding-top: 50px;
          padding-bottom: 85px;
        }
        .rent-page-wrapper .rent-hero h1 {
          font-size: clamp(2.9rem, 4.8vw, 4.8rem);
          line-height: 1.08;
          letter-spacing: -0.05em;
          max-width: 730px;
          margin-bottom: 22px;
        }
        .rent-page-wrapper .rent-hero h1 em {
          font-style: normal;
          color: var(--pink);
        }
        .rent-page-wrapper .lead {
          font-size: 1.18rem;
          color: var(--ink);
          max-width: 650px;
          line-height: 1.65;
          font-weight: 500;
        }
        .rent-page-wrapper .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }
        .rent-page-wrapper .button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          min-height: 52px;
          padding: 14px 24px;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 800;
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
          cursor: pointer;
          text-decoration: none;
        }
        .rent-page-wrapper .button:hover {
          transform: translateY(-2px);
        }
        .rent-page-wrapper .button.primary {
          background: var(--pink);
          color: #fff;
          border: 1px solid transparent;
        }
        .rent-page-wrapper .button.primary:hover {
          background: var(--pink-deep);
        }
        .rent-page-wrapper .button.outline {
          border: 1px solid #c9bdcb;
          background: #fff;
          color: var(--ink);
        }
        .rent-page-wrapper .button.outline:hover {
          border-color: var(--pink);
          color: var(--pink);
        }
        .rent-page-wrapper .button.white {
          background: #fff;
          color: var(--violet);
          border: 1px solid transparent;
        }
        .rent-page-wrapper .button.white:hover {
          background: #fbf7fa;
        }
        .rent-page-wrapper .button.dark-outline {
          border: 1px solid #947b99;
          color: #fff;
          background: transparent;
        }
        .rent-page-wrapper .button.dark-outline:hover {
          border-color: #f49acf;
          color: #f49acf;
        }
        .rent-page-wrapper .microcopy {
          color: var(--muted);
          font-size: 0.88rem;
          margin: 16px 0 0;
          font-weight: 600;
        }

        .rent-page-wrapper .rent-hero-visual {
          height: 520px;
          position: relative;
          overflow: hidden;
          border: 1px solid #eaddeb;
          border-radius: 28px;
          background: #f4ecf3;
        }
        .rent-page-wrapper .visual-note {
          position: absolute;
          left: 18px;
          bottom: 18px;
          background: rgba(255, 255, 255, 0.9);
          color: #675d6b;
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          z-index: 2;
        }

        .rent-page-wrapper .rental-strip {
          background: #fbf7fa;
          border-block: 1px solid var(--line);
        }
        .rent-page-wrapper .rental-strip-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .rent-page-wrapper .rental-strip-inner > div {
          display: flex;
          align-items: center;
          gap: 11px;
          min-height: 84px;
          padding: 16px 22px;
          border-left: 1px solid var(--line);
        }
        .rent-page-wrapper .rental-strip-inner > div:first-child {
          border-left: 0;
        }
        .rent-page-wrapper .rental-strip strong {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--ink);
        }
        .rent-page-wrapper .strip-num {
          color: var(--pink);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .rent-page-wrapper .section {
          padding-block: 65px;
        }
        .rent-page-wrapper .section-heading {
          margin-bottom: 34px;
        }
        .rent-page-wrapper .section-heading.narrow {
          max-width: 760px;
        }
        .rent-page-wrapper .section-heading h2 {
          font-size: clamp(2.3rem, 3.8vw, 3.6rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
          margin-bottom: 14px;
        }
        .rent-page-wrapper .section-heading p:not(.eyebrow) {
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.65;
        }

        .rent-page-wrapper .scenario-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 17px;
        }
        .rent-page-wrapper .scenario-card {
          display: flex;
          flex-direction: column;
          min-height: 335px;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: #fff;
          overflow: hidden;
          padding: 24px;
          box-shadow: 0 5px 18px rgba(39, 16, 46, 0.025);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .rent-page-wrapper .scenario-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
        .rent-page-wrapper .scenario-num {
          font-size: 0.68rem;
          color: var(--pink);
          letter-spacing: 0.13em;
          font-weight: 800;
        }
        .rent-page-wrapper .scenario-mark {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin: 25px 0 17px;
          border-radius: 14px;
          background: #f7eaf3;
          color: var(--violet);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
        }
        .rent-page-wrapper .scenario-card h3 {
          font-size: 1.25rem;
          line-height: 1.25;
          margin-bottom: 10px;
        }
        .rent-page-wrapper .scenario-card p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.55;
          flex: 1;
        }
        .rent-page-wrapper .scenario-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 9px;
          border: 0;
          border-top: 1px solid var(--line);
          background: transparent;
          color: var(--pink);
          font-size: 0.78rem;
          font-weight: 800;
          padding: 15px 0 0;
          cursor: pointer;
          transition: color 0.15s;
        }
        .rent-page-wrapper .scenario-link:hover {
          text-decoration: underline;
          color: var(--pink-deep);
        }

        .rent-page-wrapper .rental-fit {
          padding-block: 94px;
          background: #faf7fa;
          border-block: 1px solid var(--line);
        }
        .rent-page-wrapper .fit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10%;
          align-items: center;
        }
        .rent-page-wrapper .fit-grid h2 {
          font-size: clamp(2.3rem, 3.8vw, 3.6rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
          margin-bottom: 14px;
        }
        .rent-page-wrapper .fit-lead {
          color: var(--muted);
          max-width: 530px;
          font-size: 1.05rem;
          line-height: 1.65;
        }
        .rent-page-wrapper .text-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 24px;
          color: var(--pink);
          font-weight: 800;
          font-size: 0.95rem;
          text-decoration: none;
          cursor: pointer;
        }
        .rent-page-wrapper .text-cta:hover {
          text-decoration: underline;
        }
        .rent-page-wrapper .fit-list {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 22px;
          padding: 10px 28px;
          box-shadow: var(--shadow);
        }
        .rent-page-wrapper .fit-list > div {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 13px;
          padding: 20px 0;
          border-bottom: 1px solid var(--line);
        }
        .rent-page-wrapper .fit-list > div:last-child {
          border-bottom: 0;
        }
        .rent-page-wrapper .fit-list > div > span {
          font-weight: 800;
          font-size: 0.75rem;
          color: var(--pink);
          padding-top: 2px;
        }
        .rent-page-wrapper .fit-list h3 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        .rent-page-wrapper .fit-list p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        .rent-page-wrapper .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
        }
        .rent-page-wrapper .process-grid article {
          border: 1px solid var(--line);
          border-radius: 20px;
          background: #fff;
          padding: 28px;
          min-height: 225px;
        }
        .rent-page-wrapper .process-grid article > span {
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          border-radius: 50%;
          background: var(--violet);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 800;
          margin-bottom: 28px;
        }
        .rent-page-wrapper .process-grid h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }
        .rent-page-wrapper .process-grid p {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }
        .rent-page-wrapper .process-note {
          display: flex;
          gap: 22px;
          align-items: baseline;
          padding: 19px 24px;
          background: #f9f3f8;
          border: 1px solid #eedfeb;
          border-radius: 14px;
          margin-top: 20px;
        }
        .rent-page-wrapper .process-note strong {
          font-size: 0.85rem;
          color: var(--pink);
          white-space: nowrap;
        }
        .rent-page-wrapper .process-note p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        .rent-page-wrapper .enquiry-section {
          background: var(--violet);
          color: #fff;
          padding-block: 100px;
        }
        .rent-page-wrapper .enquiry-grid {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          gap: 8%;
          align-items: start;
        }
        .rent-page-wrapper .enquiry-copy {
          padding-top: 15px;
        }
        .rent-page-wrapper .enquiry-copy h2 {
          font-size: clamp(2.3rem, 3.8vw, 3.6rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 520px;
          margin-bottom: 14px;
        }
        .rent-page-wrapper .enquiry-copy > p:not(.eyebrow) {
          color: #ded0e1;
          max-width: 510px;
          font-size: 1.05rem;
          line-height: 1.65;
        }
        .rent-page-wrapper .enquiry-points {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 32px;
        }
        .rent-page-wrapper .enquiry-points span {
          padding: 14px 0;
          border-top: 1px solid #715278;
          color: #f3eaf4;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .rent-page-wrapper .enquiry-disclaimer {
          font-size: 0.78rem;
          margin-top: 30px;
          color: #cbb9cf !important;
        }

        .rent-page-wrapper .rental-form {
          padding: 33px;
          background: #fff;
          color: var(--ink);
          border-radius: 23px;
          box-shadow: 0 26px 60px rgba(15, 5, 19, 0.18);
        }
        .rent-page-wrapper .rental-form h3 {
          font-size: 1.5rem;
          margin-bottom: 22px;
          color: #0c0b14;
        }
        .rent-page-wrapper .rental-form label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 800;
          margin-bottom: 17px;
          color: #0c0b14;
        }
        .rent-page-wrapper .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .rent-page-wrapper .rental-form input,
        .rent-page-wrapper .rental-form select,
        .rent-page-wrapper .rental-form textarea {
          font: 500 0.88rem 'Manrope', Arial, sans-serif;
          width: 100%;
          color: var(--ink);
          background: #fff;
          border: 1px solid #ddd5df;
          border-radius: 10px;
          padding: 12px 13px;
          outline: none;
          box-sizing: border-box;
        }
        .rent-page-wrapper .rental-form textarea {
          resize: vertical;
          min-height: 95px;
        }
        .rent-page-wrapper .rental-form input:focus,
        .rent-page-wrapper .rental-form select:focus,
        .rent-page-wrapper .rental-form textarea:focus {
          border-color: var(--pink);
          box-shadow: 0 0 0 3px rgba(179, 12, 122, 0.13);
        }
        .rent-page-wrapper .rental-form input::placeholder,
        .rent-page-wrapper .rental-form textarea::placeholder {
          color: #9c95a1;
        }
        .rent-page-wrapper .submit-button {
          border: 0;
          cursor: pointer;
          width: 100%;
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .rent-page-wrapper .form-help {
          font-size: 0.74rem;
          color: var(--muted);
          margin: 13px 0 0;
          line-height: 1.5;
        }

        .rent-page-wrapper .faq-list {
          border-top: 1px solid var(--line);
        }
        .rent-page-wrapper .faq-list details {
          border-bottom: 1px solid var(--line);
          padding: 22px 0;
        }
        .rent-page-wrapper .faq-list summary {
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          font-weight: 800;
          font-size: 1.15rem;
          color: #0f0e17;
        }
        .rent-page-wrapper .faq-list summary::-webkit-details-marker {
          display: none;
        }
        .rent-page-wrapper .faq-list summary::after {
          content: '+';
          font-size: 1.5rem;
          color: var(--pink);
          line-height: 1;
          font-weight: 400;
        }
        .rent-page-wrapper .faq-list details[open] summary::after {
          content: '−';
        }
        .rent-page-wrapper .faq-list details p {
          color: var(--muted);
          font-size: 0.98rem;
          max-width: 820px;
          margin: 14px 0 0;
          line-height: 1.65;
        }

        .rent-page-wrapper .contact-band {
          background: #24102b;
          color: #fff;
          padding-block: 70px;
        }
        .rent-page-wrapper .contact-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
        }
        .rent-page-wrapper .contact-inner h2 {
          font-size: clamp(2rem, 3vw, 2.7rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
          color: #fff;
          max-width: 600px;
          margin-bottom: 11px;
        }
        .rent-page-wrapper .contact-inner p:not(.eyebrow) {
          font-size: 0.92rem;
          color: #d3c3d5;
          max-width: 560px;
          margin-bottom: 0;
          line-height: 1.65;
        }
        .rent-page-wrapper .contact-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .rent-page-wrapper .contact-actions .button {
          white-space: nowrap;
        }

        @media (max-width: 1100px) {
          .rent-page-wrapper .rent-hero {
            gap: 27px;
          }
          .rent-page-wrapper .rent-hero-visual {
            height: 455px;
          }
          .rent-page-wrapper .scenario-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .rent-page-wrapper .scenario-card {
            min-height: 290px;
          }
          .rent-page-wrapper .enquiry-grid {
            gap: 5%;
          }
        }

        @media (max-width: 760px) {
          .rent-page-wrapper .rent-hero {
            grid-template-columns: 1fr;
            padding-top: 42px;
            padding-bottom: 65px;
            gap: 30px;
          }
          .rent-page-wrapper .rent-hero-visual {
            height: auto;
            aspect-ratio: 1.1;
          }
          .rent-page-wrapper .rental-strip-inner {
            grid-template-columns: 1fr 1fr;
          }
          .rent-page-wrapper .rental-strip-inner > div {
            min-height: 70px;
            border-top: 1px solid var(--line);
          }
          .rent-page-wrapper .rental-strip-inner > div:nth-child(odd) {
            border-left: 0;
          }
          .rent-page-wrapper .rental-strip-inner > div:nth-child(-n + 2) {
            border-top: 0;
          }
          .rent-page-wrapper .rental-fit {
            padding-block: 72px;
          }
          .rent-page-wrapper .fit-grid,
          .rent-page-wrapper .enquiry-grid {
            grid-template-columns: 1fr;
            gap: 34px;
          }
          .rent-page-wrapper .fit-list {
            padding: 8px 22px;
          }
          .rent-page-wrapper .process-grid {
            grid-template-columns: 1fr;
          }
          .rent-page-wrapper .process-grid article {
            min-height: 0;
          }
          .rent-page-wrapper .process-grid article > span {
            margin-bottom: 18px;
          }
          .rent-page-wrapper .enquiry-section {
            padding-block: 75px;
          }
          .rent-page-wrapper .enquiry-copy {
            padding: 0;
          }
          .rent-page-wrapper .enquiry-copy h2 {
            max-width: none;
          }
          .rent-page-wrapper .contact-inner {
            align-items: flex-start;
            flex-direction: column;
            gap: 24px;
          }
          .rent-page-wrapper .contact-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 520px) {
          .rent-page-wrapper .rent-hero h1 {
            font-size: clamp(2.55rem, 10vw, 3.5rem);
          }
          .rent-page-wrapper .rent-hero-visual {
            aspect-ratio: 1.08;
          }
          .rent-page-wrapper .visual-note {
            left: 10px;
            bottom: 10px;
            font-size: 0.57rem;
          }
          .rent-page-wrapper .rental-strip-inner {
            grid-template-columns: 1fr;
          }
          .rent-page-wrapper .rental-strip-inner > div {
            border-left: 0 !important;
            border-top: 1px solid var(--line) !important;
            min-height: 0;
            padding: 14px 3px;
          }
          .rent-page-wrapper .rental-strip-inner > div:first-child {
            border-top: 0 !important;
          }
          .rent-page-wrapper .scenario-grid {
            grid-template-columns: 1fr;
          }
          .rent-page-wrapper .scenario-card {
            min-height: 0;
          }
          .rent-page-wrapper .scenario-mark {
            margin: 19px 0 14px;
          }
          .rent-page-wrapper .process-note {
            display: block;
          }
          .rent-page-wrapper .process-note p {
            margin-top: 6px;
          }
          .rent-page-wrapper .enquiry-points {
            grid-template-columns: 1fr 1fr;
          }
          .rent-page-wrapper .rental-form {
            padding: 22px 17px;
          }
          .rent-page-wrapper .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .rent-page-wrapper .contact-actions {
            width: 100%;
            flex-direction: column;
          }
          .rent-page-wrapper .contact-actions .button {
            width: 100%;
          }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="shell breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span>Laptop on Rent</span>
      </div>

      {/* Hero Section */}
      <section className="hero rent-hero shell" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line"></span>Laptop on Rent in Mumbai
          </p>
          <h1 id="page-title">
            Laptops When You Need Them. <em>Without the Commitment of Buying.</em>
          </h1>
          <p className="lead">
            Planning a team project, training programme or event? Tell Viraj IT how many laptops you need, what they should do and how long you need them. Our Kandivali West team can discuss suitable rental options and a quotation.
          </p>
          <div className="actions">
            <a className="button primary" href="#enquiry" onClick={handleScrollToEnquiry}>
              Request a Rental Quote <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button outline"
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20discuss%20laptops%20on%20rent.%20Please%20guide%20me."
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="microcopy">
            Paid rental service · Specifications, availability and terms are confirmed during the enquiry.
          </p>
        </div>
        <div className="rent-hero-visual">
          <Image
            src="/rental/rental-hero.webp"
            alt="Illustrative group of business laptops ready for a temporary team project"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span className="visual-note">Illustrative rental concept image</span>
        </div>
      </section>

      {/* Rental Strip */}
      <section className="rental-strip" aria-label="Why consider renting">
        <div className="shell rental-strip-inner">
          <div>
            <span className="strip-num">01</span>
            <strong>Use, without buying outright</strong>
          </div>
          <div>
            <span className="strip-num">02</span>
            <strong>Discuss the quantity you need</strong>
          </div>
          <div>
            <span className="strip-num">03</span>
            <strong>Match specifications to the job</strong>
          </div>
          <div>
            <span className="strip-num">04</span>
            <strong>Speak with a local team</strong>
          </div>
        </div>
      </section>

      {/* Section 01: Built Around Your Requirement */}
      <section className="section shell" id="use-cases" aria-labelledby="use-title">
        <div className="section-heading narrow">
          <p className="eyebrow">01 / BUILT AROUND YOUR REQUIREMENT</p>
          <h2 id="use-title">A Practical Option for Temporary Technology Needs</h2>
          <p>
            From a short project to a larger organised session, start with the work you need to do. Viraj IT can discuss a suitable rental configuration with you.
          </p>
        </div>
        <div className="scenario-grid">
          <article className="scenario-card">
            <span className="scenario-num">01 / TEAMS</span>
            <div className="scenario-mark" aria-hidden="true">▥</div>
            <h3>Business Teams &amp; Startups</h3>
            <p>
              Equip new joiners, project teams or temporary workspaces without purchasing each device upfront.
            </p>
            <button
              type="button"
              className="scenario-link"
              onClick={() => handleScenarioClick("Business team or startup")}
            >
              Discuss this requirement <span aria-hidden="true">↗</span>
            </button>
          </article>

          <article className="scenario-card">
            <span className="scenario-num">02 / LEARNING</span>
            <div className="scenario-mark" aria-hidden="true">▤</div>
            <h3>Training &amp; Workshops</h3>
            <p>
              Plan laptop access for training batches, practical sessions and learning programmes.
            </p>
            <button
              type="button"
              className="scenario-link"
              onClick={() => handleScenarioClick("Training or workshop")}
            >
              Discuss this requirement <span aria-hidden="true">↗</span>
            </button>
          </article>

          <article className="scenario-card">
            <span className="scenario-num">03 / EVENTS</span>
            <div className="scenario-mark" aria-hidden="true">◇</div>
            <h3>Events &amp; On-Site Work</h3>
            <p>
              Tell us about registrations, presentations, event operations or other temporary device needs.
            </p>
            <button
              type="button"
              className="scenario-link"
              onClick={() => handleScenarioClick("Event or on-site work")}
            >
              Discuss this requirement <span aria-hidden="true">↗</span>
            </button>
          </article>

          <article className="scenario-card">
            <span className="scenario-num">04 / PROJECTS</span>
            <div className="scenario-mark" aria-hidden="true">↗</div>
            <h3>Short-Term Projects</h3>
            <p>
              Scale a project setup around the expected duration and the tasks your team needs to handle.
            </p>
            <button
              type="button"
              className="scenario-link"
              onClick={() => handleScenarioClick("Short-term project")}
            >
              Discuss this requirement <span aria-hidden="true">↗</span>
            </button>
          </article>
        </div>
      </section>

      {/* Section 02: The Right Fit */}
      <section className="rental-fit" aria-labelledby="fit-title">
        <div className="shell fit-grid">
          <div>
            <p className="eyebrow">02 / THE RIGHT FIT</p>
            <h2 id="fit-title">Tell Us What the Laptops Need to Do.</h2>
            <p className="fit-lead">
              There is no one-size-fits-all rental setup. A useful enquiry gives the team enough detail to suggest options and prepare a relevant quotation.
            </p>
            <a className="text-cta" href="#enquiry" onClick={handleScrollToEnquiry}>
              Share your requirement <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="fit-list" aria-label="Details to include in a rental enquiry">
            <div>
              <span>01</span>
              <div>
                <h3>Quantity</h3>
                <p>How many people or workstations need a laptop?</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Workload &amp; specifications</h3>
                <p>Office work, training software, presentations or something more demanding?</p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Rental period</h3>
                <p>Share your expected start date and how long you may need the devices.</p>
              </div>
            </div>
            <div>
              <span>04</span>
              <div>
                <h3>Location</h3>
                <p>Tell the team where the laptops will be used so logistics can be discussed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: How an Enquiry Works */}
      <section className="section shell" id="process" aria-labelledby="process-title">
        <div className="section-heading narrow">
          <p className="eyebrow">03 / HOW AN ENQUIRY WORKS</p>
          <h2 id="process-title">From Requirement to a Clear Quotation</h2>
          <p>
            A straightforward conversation helps both sides confirm the practical details before any rental is agreed.
          </p>
        </div>
        <div className="process-grid">
          <article>
            <span>01</span>
            <h3>Share the brief</h3>
            <p>Send your quantity, preferred specifications, duration and use location.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Discuss the options</h3>
            <p>The Viraj IT team can check suitable configurations and clarify what is available.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Review the quotation</h3>
            <p>Confirm the price, included services, responsibilities and logistics before proceeding.</p>
          </article>
        </div>
        <div className="process-note">
          <strong>Good to know</strong>
          <p>
            Rental pricing and conditions depend on the final requirement. This page does not confirm stock, delivery, maintenance or replacement commitments.
          </p>
        </div>
      </section>

      {/* Section 04: Start the Conversation (Form) */}
      <section className="enquiry-section" id="enquiry" ref={enquiryRef} aria-labelledby="enquiry-title">
        <div className="shell enquiry-grid">
          <div className="enquiry-copy">
            <p className="eyebrow light">04 / START THE CONVERSATION</p>
            <h2 id="enquiry-title">Get a Quote for Your Laptop Rental Need.</h2>
            <p>
              Share the basics below. The button prepares a WhatsApp message for Viraj IT, so you can review it before sending.
            </p>
            <div className="enquiry-points">
              <span>Quantity &amp; use case</span>
              <span>Expected duration</span>
              <span>Preferred specifications</span>
              <span>Location in or around Mumbai</span>
            </div>
            <p className="enquiry-disclaimer">
              Submitting this form does not reserve laptops or confirm a booking.
            </p>
          </div>
          <form className="rental-form" id="rental-form" onSubmit={handleSubmit}>
            <h3>Tell us what you need</h3>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>
              <label>
                Organisation
                <input
                  name="organisation"
                  autoComplete="organization"
                  placeholder="Company or organisation"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Laptop quantity
                <input
                  name="quantity"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  placeholder="e.g. 10"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </label>
              <label>
                Rental use
                <select
                  name="use"
                  id="rental-use"
                  ref={useSelectRef}
                  required
                  value={formData.use}
                  onChange={(e) => setFormData({ ...formData, use: e.target.value })}
                >
                  <option value="">Select a use case</option>
                  <option value="Business team or startup">Business team or startup</option>
                  <option value="Training or workshop">Training or workshop</option>
                  <option value="Event or on-site work">Event or on-site work</option>
                  <option value="Short-term project">Short-term project</option>
                  <option value="Other requirement">Other requirement</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Expected duration
                <input
                  name="duration"
                  required
                  placeholder="e.g. 2 weeks or 3 months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </label>
              <label>
                Use location
                <input
                  name="location"
                  required
                  placeholder="Area / city"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </label>
            </div>
            <label>
              Specifications or software needs
              <textarea
                name="requirements"
                rows={4}
                placeholder="Tell us about the work, preferred RAM/storage, software or any other useful detail"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </label>
            <button className="button primary submit-button" type="submit">
              Prepare WhatsApp Enquiry <span aria-hidden="true">↗</span>
            </button>
            <p className="form-help">
              WhatsApp opens with your details; you choose whether to send the message. No data is stored by this wireframe.
            </p>
          </form>
        </div>
      </section>

      {/* Section 05: Common Questions */}
      <section className="section shell" id="faq" aria-labelledby="faq-title">
        <div className="section-heading narrow">
          <p className="eyebrow">05 / COMMON QUESTIONS</p>
          <h2 id="faq-title">Before You Enquire</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Can I ask for a specific laptop configuration?</summary>
            <p>
              Yes. Share the tasks, software and preferred specifications in your enquiry. The team can discuss suitable rental options and current availability.
            </p>
          </details>
          <details>
            <summary>How much does laptop rental cost?</summary>
            <p>
              Pricing depends on the quantity, configuration, rental period and other confirmed terms. Request a quotation with your requirements.
            </p>
          </details>
          <details>
            <summary>Is there a minimum rental period?</summary>
            <p>
              Please share your expected dates. The team can confirm which rental periods are available for your requirement.
            </p>
          </details>
          <details>
            <summary>Can you arrange delivery, setup or support?</summary>
            <p>
              Ask the team about your location and operational needs. Any logistics, setup or support terms should be confirmed in the quotation.
            </p>
          </details>
          <details>
            <summary>Is this the same as a repair loaner laptop?</summary>
            <p>
              No. This page is for paid laptop rental for business, training, events and temporary work. Any device arrangement connected with a repair is a separate matter to discuss with the repair team.
            </p>
          </details>
        </div>
      </section>

      {/* Contact Band */}
      <section className="contact-band" id="contact">
        <div className="shell contact-inner">
          <div>
            <p className="eyebrow light">LET'S TALK LAPTOPS</p>
            <h2>Need to Discuss Your Requirement First?</h2>
            <p>
              Call or message our Kandivali West team and explain the number of laptops, use case and expected dates.
            </p>
          </div>
          <div className="contact-actions">
            <a className="button white" href="tel:+918928715729">
              Call Viraj IT <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button dark-outline"
              href="https://wa.me/918928715729?text=Hi%20Viraj%20IT%2C%20I%27d%20like%20to%20discuss%20a%20laptop%20rental%20requirement."
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
