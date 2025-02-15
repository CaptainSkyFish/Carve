/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
export default {
  content: {
    files: ["./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        katros: ['katros', 'sans-serif'],
        anton: ['anton', 'sans-serif'],
        dmserif: ['dmserif', 'sans'],
        fjalla: ['fjalla', 'sans']
      }
    },
  },
  plugins: [
    fluid
  ],
}