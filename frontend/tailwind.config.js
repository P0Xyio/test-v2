/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        text: "#070c1d",
        background: "#eff1fb",
        primary: "#4360cb",
        secondary: "#b88bdf",
        accent: "#b867d5",


        // text: "#e2e7f8",
        // background: "#040610",
        // primary: "#3451bc",
        // secondary: "#4d2074",
        // accent: "#7b2a98",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

