/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Align with mstrmnd-os: platinum #e8e2d0 over obsidian #0a0a0b. No second hue.
        background: {
          DEFAULT: "#0a0a0b",
          secondary: "#101012",
          tertiary: "#16161a",
          elevated: "#1e1e22",
        },
        border: {
          DEFAULT: "#1e1e22",
          subtle: "#16161a",
          strong: "#2a2a30",
        },
        text: {
          primary: "#e8e2d0",
          secondary: "#8a877d",
          tertiary: "#55534c",
          muted: "#55534c",
        },
        accent: {
          DEFAULT: "#e8e2d0",
          foreground: "#0a0a0b",
          hover: "#f0ebe0",
          muted: "#e8e2d014",
        },
        success: "#8a877d",
        warning: "#8a877d",
        destructive: "#8a877d",
      },
      fontFamily: {
        sans: ["System"],
        mono: ["ui-monospace", "monospace"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
