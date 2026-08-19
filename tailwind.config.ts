import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Primary brand — Burgundy
        burgundy: {
          DEFAULT: "#64313E",
          50: "#F6EEF0",
          100: "#EBD9DE",
          200: "#D6B3BD",
          300: "#BE8D9B",
          400: "#9C5E70",
          500: "#7C4353",
          600: "#64313E", // brand
          700: "#512832",
          800: "#3C1E26",
          900: "#2A151B",
        },
        // Secondary brand — Pastel Blue
        pastel: {
          DEFAULT: "#C1DBE8",
          50: "#F5FAFC",
          100: "#E9F3F8",
          200: "#C1DBE8", // brand
          300: "#9EC6DA",
          400: "#74AAC6",
          500: "#5490B2",
          600: "#42758F",
          700: "#365E74",
          800: "#2B4A5B",
          900: "#213947",
        },
        ink: {
          DEFAULT: "#1E1719",
          soft: "#3A3134",
          muted: "#6B6167",
        },
        cream: {
          DEFAULT: "#FAF8F7",
          100: "#F3EEEC",
        },
        // Soft blush used for the home hero background
        blush: {
          50: "#FCF4F6",
          100: "#F9EAEE",
          200: "#F3D8DE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(30,23,25,0.04), 0 8px 24px -12px rgba(30,23,25,0.12)",
        "card-hover":
          "0 2px 4px rgba(30,23,25,0.05), 0 18px 40px -16px rgba(100,49,62,0.28)",
        lift: "0 24px 60px -24px rgba(100,49,62,0.35)",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "grow-bar": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "grow-bar": "grow-bar 900ms cubic-bezier(0.22,1,0.36,1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
