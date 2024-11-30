/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'gilroy-semibold': ['Gilroy-Semibold', 'sans-serif'],
        'gilroy-bold': ['Gilroy-Bold', 'sans-serif'],
        'gilroy-medium': ['Gilroy-Medium', 'sans-serif'],
        'gilroy-regular': ['Gilroy-Regular', 'sans-serif'],
        'gilroy-thin': ['Gilroy-Thin', 'sans-serif']
      },
      colors: {
        'primary': '#0EB182'
      }
    },
  },
  plugins: [],
}