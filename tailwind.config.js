/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./src/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'parkinsans': ['Parkinsans', 'sans-serif'],
      },
      backgroundImage: {
        'ab1': "url('./assets/abstract_1.jpg')",    
        'ab2': "url('./assets/abstract_2.jpg')",    
        'bird': "url('./assets/bird.jpg')",    
      },
    },
  },
  plugins: [],
}