import React from "react";
import { CatalogueBrowser } from "@/components/store/CatalogueBrowser";

export const metadata = {
  title: "Refurbished Laptops in Kandivali West, Mumbai | Viraj Infotech",
  description:
    "Buy certified refurbished Dell and HP laptops at Viraj Infotech in Kandivali West, Mumbai. Walk in for live demos, free accessories, and included warranty.",
};

export default function RefurbishedLaptopsKandivaliPage() {
  return (
    <CatalogueBrowser
      badge="LOCAL KANDIVALI WEST STORE • MUMBAI"
      title="Refurbished Laptops in Kandivali"
      subtitle="Visit Viraj Infotech in Kandivali West to test these refurbished laptops in person, or order online for express delivery across Mumbai."
    />
  );
}
