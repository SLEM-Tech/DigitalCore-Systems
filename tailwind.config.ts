import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // The site uses a clean Sans-Serif, Poppins works well.
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        /* ========== Updated Design Palette ========== */
        brand: {
          orange: "#E68A45", // The muted orange used in "comfort" and buttons
          beige: "#F9F3E5", // The dominant hero background
          dark: "#0D0D0D", // The deep neutral from the footer
        },

        background: "#F9F3E5", // Dominant warm beige (Hero section)
        surface: "#FFFFFF", // Main card surfaces
        panel: "#F2E7D5", // Darker beige used in the "About Us" and section transitions

        primary: {
          50: "#FFF8F1",
          100: "#FEEDDC",
          200: "#FCD7B9",
          300: "#F8B989",
          400: "#F2965D",
          500: "#E68A45", // Main Muted Orange Accent
          600: "#D17036",
          700: "#AD582E",
          800: "#8B482A",
          900: "#723D26",
          DEFAULT: "#E68A45",
          foreground: "#FFFFFF",
        },

        // Refined Grays for text and UI elements
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5", // Soft gray used for card image backgrounds
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#0D0D0D", // Dark neutral used in footer
        },

        success: {
          DEFAULT: "#29C482",
          foreground: "#FFFFFF",
        },

        accent: "#E68A45",
        price: "#E68A45",
        whatsapp: "#25D366",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    screens: {
      xs: "400px",
      xmd: "800px",
      slg: "999px",
      ...require("tailwindcss/defaultTheme").screens,
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#E83E44",
              foreground: "#FFFFFF",
            },
            focus: "#E83E44",
          },
        },
      },
    }),
  ],
};
export default config;
