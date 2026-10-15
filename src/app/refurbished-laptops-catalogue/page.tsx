import React from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops Catalogue | Viraj Infotech Mumbai",
  description:
    "Browse certified refurbished Dell Latitude and HP EliteBook/ProBook laptops in Mumbai with warranty included and starting from ₹21,990.",
};

export default function RefurbishedLaptopsCataloguePage() {
  return (
    <CatalogueBrowser
      badge="MUMBAI'S TRUSTED REFURBISHED LAPTOP STORE"
      title="Refurbished Laptops Catalogue"
      subtitle="Compare Dell Latitude and HP commercial refurbished laptops. Filter by budget, processor, or Touch Screen, and inspect full specifications."
    />
  );
}
