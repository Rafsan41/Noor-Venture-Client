import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── Brand palette ─────────────────────────────────────────────────────
        // 30% — Coral / salmon primary
        coral: {
          50:  "#FFF5EE",
          100: "#FFE4D0",
          200: "#FFC8A8",
          300: "#FFA880",
          400: "#FF9270",
          500: "#FF8C69",   // ← primary brand
          600: "#E8673D",
          700: "#CC4522",
          800: "#A82E0E",
          900: "#881C04",
          950: "#5C0E00",
        },
        // 10% — Blush / rose secondary
        blush: {
          50:  "#FDF2F8",
          100: "#FAE0EE",
          200: "#F5C0DC",
          300: "#EC9AC7",
          400: "#E07EB5",
          500: "#D4719A",   // ← secondary accent
          600: "#BC4E80",
          700: "#9E3367",
          800: "#7F1D4F",
          900: "#63103B",
          950: "#3D0524",
        },
        // 50% neutral — warm cream (used as bg tint)
        cream: {
          50:  "#FFFDF7",
          100: "#FFFAED",
          200: "#FFF5D6",
          300: "#FFEEB8",
          400: "#FFE599",
          500: "#FFD966",
          600: "#E8BC33",
          700: "#CC9A18",
          800: "#A87A0A",
          900: "#885E04",
        },
        // Ink — deep purple-dark (design's --ink)
        ink: {
          DEFAULT: "#1A0B2E",
          soft:    "#3D2456",
        },
        // Pink — hot pink accent (design's --pink / --pink-deep)
        pink: {
          DEFAULT: "#E85395",
          deep:    "#C73478",
        },
        // Purple brand
        purple: {
          DEFAULT: "#A73CCB",
          deep:    "#7B1FA2",
        },
        // Line / border shades
        line: {
          DEFAULT: "#E9DDB8",
          strong:  "#C7B582",
        },
        // Keep emerald for financial positive indicators
        emerald: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans:   ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif:  ["var(--font-fraunces)", "Georgia", "serif"],
        display:["var(--font-fraunces)", "Georgia", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "pulse-noor": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.5" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%":      { transform: "translateY(-8px) rotate(2deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        ping2: {
          "0%":      { transform: "scale(.5)", opacity: "0.8" },
          "80%,100%":{ transform: "scale(2.4)", opacity: "0" },
        },
        bounce2: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%":      { transform: "translateY(-4px)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "pulse-noor":     "pulse-noor 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float:            "float 9s ease-in-out infinite",
        "float-slow":     "float 12s ease-in-out infinite",
        "spin-slow":      "spin-slow 80s linear infinite",
        "spin-med":       "spin-slow 40s linear infinite",
        rise:             "rise 0.7s cubic-bezier(.2,.7,.2,1) both",
        marquee:          "marquee 50s linear infinite",
        ping2:            "ping2 1.8s ease-out infinite",
        bounce2:          "bounce2 1.4s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
