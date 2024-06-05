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
        'third-blue': '#89CFF3',
        'main-background': '#FFFFFF',
        'main-text': '#FFFFFF',
        'main-gray': '#F4F4F4',
        'second-gray': 'rgba(0,0,0,0.5)',
      },
      fontFamily: {
        poppins: ['Poppins']
      }
    },
  },
  plugins: [],
}

