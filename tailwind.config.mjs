/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ff3b3b",
          dark: "#191c1e",
          light: "#f7f9fc",
        },
        dip: {
          blue: "#1e455e",
        }
      },
    },
  },
  plugins: [],
};
