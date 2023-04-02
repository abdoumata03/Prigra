/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      eudox: ['eudoxus sans', 'sans-serif'],
    },
    colors: {
      primary : "#4345FD",
      accent : "#F3F4FD",
      success: "#27AE60",
      waring: "#E2B93B",
      error: "#EB5757"
    }
  },
  plugins: [],
}