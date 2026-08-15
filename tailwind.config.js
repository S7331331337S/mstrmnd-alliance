/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#0a0a0a",
          tertiary: "#111111",
          elevated: "#1a1a1a",
        },
        border: {
          DEFAULT: "#222222",
          subtle: "#1a1a1a",
          strong: "#333333",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
          tertiary: "#71717a",
          muted: "#52525b",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
          hover: "#7c3aed",
          muted: "#8b5cf620",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        destructive: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "System"],
        mono: ["SpaceMono", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
