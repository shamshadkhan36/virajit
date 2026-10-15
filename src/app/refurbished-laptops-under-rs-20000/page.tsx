import React from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops Under Rs.25,000 in Mumbai | Viraj Infotech",
  description:
    "Shop certified refurbished Dell Latitude and HP laptops under Rs.25,000 in Mumbai with warranty and free accessories included.",
};

export default function Under25kPage() {
  return (
    <CatalogueBrowser
      badge="BUDGET FRIENDLY • STARTING ₹21,990"
      title="Refurbished Laptops Under Rs.25,000"
      subtitle="Reliable corporate-grade Intel Core i5 refurbished laptops with 8GB RAM and 256GB SSD under ₹25,000."
      initialMaxPrice={25000}
    />
  );
}
