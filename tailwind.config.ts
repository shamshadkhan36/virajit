import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8f4",
          100: "#e1f0e7",
          200: "#bfe0ce",
          300: "#91c9ad",
          400: "#5ca986",
          500: "#1b6343",
          600: "#134e35", // Deep forest green from screenshot
          700: "#0f3e2a",
          800: "#0c3121",
          900: "#092318",
          950: "#05140e",
        },
        forest: {
          800: "#143a2c",
          900: "#0f2e22", // Deep pine feature box from screenshot
          950: "#0b2219",
        },
        cream: {
          50: "#fbfbf8",
          100: "#f6f5ef", // Main warm cream page background from screenshot
          200: "#eeece2",
          300: "#e3dfd0",
          400: "#c7c0ac",
          500: "#aaa18b",
          600: "#8a816c",
        },
        accent: {
          lime: "#4ade80",
          emerald: "#16a34a",
          whatsapp: "#25d366",
        },
        tech: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
