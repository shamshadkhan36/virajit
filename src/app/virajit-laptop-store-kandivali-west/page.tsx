import React from "react";
import { Metadata } from "next";
import { VisitStoreContent } from "./VisitStoreContent";

export const metadata: Metadata = {
  title: "Visit Viraj IT Store in Kandivali West, Mumbai | Directions & Timings",
  description:
    "Visit Viraj IT in Kandivali West for refurbished laptops, branded laptops, printers and laptop repairs. Find our verified address, timings, contact details and directions.",
  alternates: {
    canonical: "/virajit-laptop-store-kandivali-west",
  },
  openGraph: {
    title: "Visit Viraj IT — Kandivali West, Mumbai",
    description:
      "Find our store location, opening hours, contact number and Google Maps directions.",
    url: "/virajit-laptop-store-kandivali-west",
    type: "website",
  },
};

export default function VisitStorePage() {
  return <VisitStoreContent />;
}
