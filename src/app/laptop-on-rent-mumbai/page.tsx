import { Metadata } from "next";
import RentalClient from "./RentalClient";

export const metadata: Metadata = {
  title: "Laptops on Rent in Mumbai | Viraj IT — Kandivali West",
  description:
    "Discuss laptop rental requirements for teams, training, events and temporary projects with Viraj IT in Mumbai. Fast turnaround, tailored configurations, and local Kandivali West store support.",
};

export default function LaptopOnRentPage() {
  return <RentalClient />;
}
