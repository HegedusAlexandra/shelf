/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./src/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'didone': ['AnticDidone', 'serif'],
        'opensans': ['OpenSans', 'sans-serif'],
      },
      backgroundImage: {
        'leaf': "url('./assets/leaf.jpg')",    
        'ab2': "url('./assets/abstract_2.jpg')",    
        'ab3': "url('./assets/abstract_3.jpg')",    
        'pink': "url('./assets/pink.jpg')",    
      },
    },
  },
  plugins: [],
}