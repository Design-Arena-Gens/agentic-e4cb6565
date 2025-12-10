import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef8ff",
          100: "#d5ecff",
          200: "#a8d9ff",
          300: "#6fc0ff",
          400: "#3ca7ff",
          500: "#0b8cff",
          600: "#006cdb",
          700: "#0053ad",
          800: "#003a7d",
          900: "#002957"
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
