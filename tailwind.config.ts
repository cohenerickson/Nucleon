import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        "tab-deselected": "var(--tab-deselected)",
        "tab-selected": "var(--tab-selected)",
        "tab-hover": "var(--tab-hover)",
        "button-hover": "var(--button-hover)"
      }
    }
  },
  plugins: []
} satisfies Config;
