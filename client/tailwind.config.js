/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'tiny': '0.25rem',
      },
      scale: {
        'small': '1.01'
      }
    },
  },
  plugins: [],
}

