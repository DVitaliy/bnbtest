const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        marker: ["Permanent Marker", ...defaultTheme.fontFamily.sans],
        hand: ["Patrick Hand", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
