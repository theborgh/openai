/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#8ecd8e",
        "header-link": "",
        "footer-bg": "#71c171",
        logo1: "#47476b",
        logo2: "#666699",
      },
    },
  },
  plugins: [],
};
