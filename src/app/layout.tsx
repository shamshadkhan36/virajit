import type { Metadata } from "next";
import "./globals.css";
import { LockProvider } from "@/context/LockContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyHoldBar } from "@/components/layout/StickyHoldBar";
import { CheckoutModal } from "@/components/store/CheckoutModal";

export const metadata: Metadata = {
  title: "Viraj Infotech | Certified Refurbished Laptops & Real-Time Stock Locks",
  description:
    "Professionally tested refurbished laptops for work, study and gaming — backed by real warranty and local support with 10-minute stock locks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream-100 text-slate-900 min-h-screen flex flex-col selection:bg-brand-500 selection:text-white antialiased">
        <LockProvider>
          <Navbar />
          <main className="flex-1 pb-16">{children}</main>
          <StickyHoldBar />
          <CheckoutModal />
          <Footer />
        </LockProvider>
      </body>
    </html>
  );
}
