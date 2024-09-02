/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors:{"customBlue-500": '#133FBD',customAmber: '#FFB800',}},
  },
  plugins: [],
}
