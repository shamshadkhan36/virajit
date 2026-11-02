import React, { Suspense } from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Shop Refurbished Laptops | Viraj IT — Wireframe",
  description:
    "Explore tested refurbished laptops from leading brands. Compare specifications, prices and warranty options to find a laptop suited to your needs.",
};

export default function RefurbishedLaptopsCataloguePage() {
  return (
    <Suspense fallback={<div className="shell py-24 text-center">Loading catalogue...</div>}>
      <CatalogueBrowser />
    </Suspense>
  );
}
