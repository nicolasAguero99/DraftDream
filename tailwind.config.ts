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
        primary: '#F7717D'
      },
      boxShadow: {
        'both-sides': '0 2px 6px 0 #dddddd'
      },
    },
  },
  plugins: [],
}
export default config;
