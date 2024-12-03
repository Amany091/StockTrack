import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: '2rem',
        center: true,
      },

      colors: {
        title: "#1976D2 ",
        del: "#D32F2F"
      },
      backgroundColor: {
        button: "#2563eb"
      }
    },
  },
  plugins: [],
};
export default config;
