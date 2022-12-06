/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#19004E",
        "color-secondary": "#c4d6e9",
        "color-disabled": "#99a9b8",
      },
    },
  },
  plugins: [],
};
