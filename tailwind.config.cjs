/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      eudox: ['eudoxus sans', 'sans-serif'],
    },
    colors: {
      primary : "#4345FD",
      primary_focused: "#2224D9",
      accent : "#F3F4FD",
      info : "#2F80ED", 
      success: "#27AE60",
      waring: "#E2B93B",
      error: "#EB5757",
      gray1: '#333333',
      gray2 : '#4F4F4F',
      gray3 : '#828282', 
      gray4 : '#BDBDBD', 
      gray5 : '#E0E0E0', 
      white_bg: '#FAFAFC', 
      bg: '#F2F0F0',
      ...colors
    },
    boxShadow: {
      'custom' : '-5px 10px 25px 5px rgba(133, 133, 133, 0.05)'
    }
  },
  plugins: [],
}