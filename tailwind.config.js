/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'primary-blue': '#007bff',
      },
      boxShadow:{
         'custom-md':'0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      screens:{
        'xsm': '340px',
      },
    },
  },
  plugins: [],
}