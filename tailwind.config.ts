import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a2332",
          light: "#2a3a4e",
        },
        accent: {
          DEFAULT: "#b8977e",
          light: "#d4c4b0",
          dark: "#9a7a62",
        },
        surface: {
          DEFAULT: "#faf9f7",
          warm: "#f5f0eb",
        },
        "text-primary": "#1a2332",
        "text-secondary": "#5a6a7a",
        "text-muted": "#8a96a3",
        border: {
          DEFAULT: "#e8e3dd",
          light: "#f0ece7",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", '"Helvetica Neue"', "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
