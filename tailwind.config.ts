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
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#e879b9",
          500: "#d6298b",
          600: "#c01875",
          700: "#9d176b",
          800: "#701a68",
          900: "#4c1d5f",
          950: "#2d103b",
        },
        forest: {
          800: "#401a50",
          900: "#2d103b",
          950: "#1c0b29",
        },
        cream: {
          50: "#fffefe",
          100: "#fbf8fc",
          200: "#f3edf6",
          300: "#e8dfea",
          400: "#cbbdce",
          500: "#ad9cb2",
          600: "#89758f",
        },
        accent: {
          lime: "#f9a8d4",
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
