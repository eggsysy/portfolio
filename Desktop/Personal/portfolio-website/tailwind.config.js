/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Near-black charcoal, not pure black — grain needs something to sit in. */
        ink: {
          DEFAULT: "#0e0e0e",
          lift: "#161616",
          panel: "#1a1a1a",
          deep: "#080808",
        },
        line: {
          DEFAULT: "#262626",
          bright: "#3a3a3a",
        },
        chalk: {
          DEFAULT: "#dcdbd7", // body text
          dim: "#8e8d89", // secondary
          faint: "#5c5b58", // tertiary, rules
        },
        /* The one accent: a desaturated sage. Icons, CTAs, nothing else. */
        sage: {
          DEFAULT: "#8fa99b",
          dim: "#6b8378",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      letterSpacing: {
        wider2: "0.14em",
        widest2: "0.2em",
        widest3: "0.3em",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "20%": { transform: "translate(-4%, 2%)" },
          "30%": { transform: "translate(2%, -4%)" },
          "40%": { transform: "translate(-1%, 3%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "60%": { transform: "translate(3%, 0)" },
          "70%": { transform: "translate(0, 3%)" },
          "80%": { transform: "translate(-3%, 0)" },
          "90%": { transform: "translate(2%, 2%)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        breathe: "breathe 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
