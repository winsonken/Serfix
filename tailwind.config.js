/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'main-orange': '#FA8072',
        'main-blue': '#00A9FF',
        'second-blue': '#CDF5FD',
        'main-background': '#FFFFFF',
        'main-text': '#FFFFFF'
      },
      fontFamily: {
        poppins: ['Poppins']
      }
    },
  },
  plugins: [],
}

