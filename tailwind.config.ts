import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "soft-white": "#F5F8F6",
        "light-gray": "#F5F8F6",
        "secondary-bg": "#F5F8F6",
        turquoise: "#08DCC5",
        cyan: "#00EBC0",
        "neon-green": "#00E85A",
        "evion-dark": "#071A16",
        "evion-surface": "#F5F8F6",
        "evion-border": "#DCE7E2",
        "evion-muted": "#606D68",
        "electric-green": {
          DEFAULT: "#00E85A",
          deep: "#00C94D",
          dark: "#00A93F",
          light: "#33ED7B",
          mint: "#E6FBF0",
          "mint-light": "#F2FDF7",
          glow: "rgba(0, 232, 90, 0.45)",
        },
        "electric-cyan": {
          DEFAULT: "#08DCC5",
          light: "#00EBC0",
          dark: "#05B29F",
          mint: "#E6FAF8",
          glow: "rgba(8, 220, 197, 0.45)",
        },
        charcoal: {
          DEFAULT: "#071A16",
          light: "#122E28",
          muted: "#606D68",
        },
        "secondary-text": "#606D68",
        "light-border": "#DCE7E2",
      },
      backgroundImage: {
        "evion-gradient": "linear-gradient(100deg, #08DCC5 0%, #00EBC0 48%, #00E85A 100%)",
        "evion-gradient-hover": "linear-gradient(100deg, #19e0cb 0%, #1aedc5 48%, #1ee96c 100%)",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "Lato", "Nunito Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-lato)", "Lato", "Nunito Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        lato: ["var(--font-lato)", "Lato", "sans-serif"],
        heading: ["var(--font-lato)", "Lato", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
        poster: "-0.035em",
      },
      lineHeight: {
        tightest: "0.88",
        poster: "0.92",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(7, 26, 22, 0.05)",
        card: "0 10px 30px -4px rgba(7, 26, 22, 0.06)",
        "card-hover": "0 20px 40px -4px rgba(7, 26, 22, 0.10)",
        floating: "0 20px 50px -10px rgba(7, 26, 22, 0.12)",
        "gradient-glow": "0 0 25px rgba(8, 220, 197, 0.45), 0 8px 25px -4px rgba(0, 232, 90, 0.35)",
        "gradient-glow-lg": "0 0 45px rgba(8, 220, 197, 0.55), 0 12px 35px -4px rgba(0, 232, 90, 0.45)",
        "green-glow": "0 0 25px rgba(0, 232, 90, 0.45)",
        "green-glow-lg": "0 0 45px rgba(0, 232, 90, 0.55)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "wave-flow": "waveFlow 2s linear infinite",
        "flow-energy": "flowEnergy 1.5s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        waveFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        flowEnergy: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
