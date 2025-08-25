import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
    extend: {
      colors: { ink: "#000000", paper: "#FFFFFF" },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.5rem" },
      opacity: { 5: "0.05", 10: "0.10", 20: "0.20" },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.10)",
        "soft-lg": "0 20px 50px rgba(0,0,0,0.12)"
      },
      transitionTimingFunction: { smooth: "cubic-bezier(0.4,0,0.2,1)" },
      keyframes: {
        reveal: { "0%": { opacity: 0, transform: "scale(.98)" }, "100%": { opacity: 1, transform: "scale(1)" } },
        press: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(.97)" } }
      },
      animation: { reveal: "reveal .25s smooth both", press: "press .12s ease-out both" }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")]
} satisfies Config;
