import React from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops Under Rs.35,000 in Mumbai | Viraj Infotech",
  description:
    "Shop certified refurbished Dell Latitude and HP EliteBook laptops under Rs.35,000 in Mumbai with up to 36 months warranty.",
};

export default function Under35kPage() {
  return (
    <CatalogueBrowser
      badge="BEST VALUE OFFICE SERIES"
      title="Refurbished Laptops Under Rs.35,000"
      subtitle="High-performance Dell Latitude & HP laptops up to ₹35,000 with 8th & 10th Gen processors and up to 512GB SSD."
      initialMaxPrice={35000}
    />
  );
}
