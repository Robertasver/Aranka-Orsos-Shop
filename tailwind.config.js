/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        base: '17px',
        lg: '19px',
        xl: '22px',
        '2xl': '26px',
        '3xl': '32px',
      },
      colors: {
        floral: '#f6f6f6',
        leaf: '#355E3B',
        rose: '#e63946',
        muted: '#333333',
        gold: '#c9a944',
      },
    },
  },
  plugins: [],
};
