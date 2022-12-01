/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'Sans']
      },
      colors: {
        'lightGray': 'hsl(0, 0%, 98%)',
        'darkGrayish': 'hsl(233, 14%, 35%)'
      },
      fontSize: '19px',
      backgroundImage: {
        'bgDark': "url('/images/bg-desktop-dark.jpg')",
        'bgLight': "url('/images/bg-desktop-light.jpg')",
        'bgDarkM': "url('images/BG-MOBILE-DARK.jpg')",
        'bgLightM': "url('/images/BG-MOBILE-LIGHT.jpg')",
      }
    },
  },
  plugins: [],
}