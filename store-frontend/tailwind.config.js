/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        
      },
    },
  },
  darkMode:false,
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'], 
  },
};