/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
theme: {
    extend: {
      animation: {
        'slideout': 'slideout 5s forwards'
      },
      keyframes: {
        slideout: {
          '0%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(-75%)' }
        }
      }
    }
  },
  variants: {},
  plugins: [],
}
