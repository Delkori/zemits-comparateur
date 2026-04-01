import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        zemits: {
          gold: "#C9A84C",
          dark: "#1a1a2e",
          light: "#f8f4ef"
        }
      }
    }
  },
  plugins: []
};
export default config;
