/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom650': '650px',
        'custom426': '426px',
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}

