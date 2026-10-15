import React from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops Under Rs.45,000 in Mumbai | Viraj Infotech",
  description:
    "Shop premium refurbished Dell Latitude and HP laptops under Rs.45,000 in Mumbai including Touch Screen and 11th/12th Gen Intel Core i5 & i7 models.",
};

export default function Under45kPage() {
  return (
    <CatalogueBrowser
      badge="PREMIUM & TOUCH SCREEN SERIES"
      title="Refurbished Laptops Under Rs.45,000"
      subtitle="Explore 11th & 12th Gen Intel Core i5 and i7 refurbished laptops with FHD Touch Screen displays."
      initialMaxPrice={45000}
    />
  );
}
