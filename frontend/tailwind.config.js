/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wood-light': '#D2B48C', // لون خشب البلوط (Oak)
        'wood-dark': '#3d2b1f',  // لون خشب الجوز (Walnut)
        'sand': '#f5f5dc',       // لون بيج فاتح (Creamy White)
      }
    },
  },
  plugins: [],
}