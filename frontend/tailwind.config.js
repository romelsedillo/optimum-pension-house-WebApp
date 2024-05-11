const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Montserrat: ["Montserrat", "sans-serif"],
      CormorantGaramond: ["Cormorant Garamond", "serif"],
      Raleway: ["Raleway", "serif"],
      Manrope: ["Manrope", "serif"],
      DMSerifDisplay: ["DMSerifDisplay", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
