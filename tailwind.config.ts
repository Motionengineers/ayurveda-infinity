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
        /* 60-30-10 Rule Palette - Pastel (Apple HIG Inspired) */
        palette: {
          60: "#FFF8F5", /* Soft Pink/Peach - 60% Primary */
          30: "#E0F2E8", /* Mint Green - 30% Secondary */
          10: "#FFD89B", /* Light Yellow/Gold - 10% Accent */
        },
        "neutral-text": {
          dark: "#1D1D1F", /* Apple's near-black */
          medium: "#6E6E73", /* Apple's medium gray */
          light: "#86868B", /* Apple's light gray */
        },
        "neutral-surface": "#FFFFFF",
        "neutral-border": "#D2D2D7", /* Apple's border color */
        /* Pastel Accents */
        "pastel": {
          pink: "#F5D7D7",
          peach: "#F5E6D8",
          yellow: "#FFF8E1",
          mint: "#E0F2E8",
          blue: "#E3F2FD",
        },
        /* Legacy colors - mapped to 60-30-10 */
        "herbal-green": {
          DEFAULT: "#A7C6A1", // 30% Secondary
          50: "#F0F7EF",
          100: "#E0EFDE",
          200: "#C1DFBD",
          300: "#A7C6A1",
          400: "#8DAD85",
          500: "#739469",
        },
        "turmeric-gold": {
          DEFAULT: "#D9A441", // 10% Accent
          50: "#FEF9ED",
          100: "#FDF3DB",
          200: "#FBE7B7",
          300: "#D9A441",
          400: "#B8872E",
          500: "#976A1B",
        },
        "clay-beige": {
          DEFAULT: "#F4EDE1", // 60% Primary
          50: "#FDFBF8",
          100: "#F4EDE1",
          200: "#E8DBC3",
          300: "#DCC9A5",
        },
        "sand-brown": {
          DEFAULT: "#B89B7C",
          50: "#F5F1EB",
          100: "#E8DDD0",
          200: "#D1BBA1",
          300: "#B89B7C",
          400: "#9A7E5F",
          500: "#7C6142",
        },
        "deep-earth": {
          DEFAULT: "#46392B", // Neutral text
          50: "#F5F3F0",
          100: "#E8E2D9",
          200: "#D1C5B3",
          300: "#46392B",
          400: "#2F261C",
          500: "#18130D",
        },
        "soft-blue": {
          DEFAULT: "#C8DCEB",
          50: "#F5F9FC",
          100: "#EBF3F9",
          200: "#C8DCEB",
          300: "#A5C5DD",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "gentle-glow": "gentle-glow 3s ease-in-out infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

