/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./src/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'playwrite': ['Playwrite HU', 'cursive'],
        'opensans': ['OpenSans', 'sans-serif'],
      },
      backgroundImage: {
        'leaf': "url('./assets/leaf.jpg')",    
        'ab2': "url('./assets/abstract_2.jpg')",    
        'ab3': "url('./assets/abstract_3.jpg')",    
        'pink': "url('./assets/pink.jpg')",    
        'cake1': "url('./assets/cake1.jpg')",    
        'cake2': "url('./assets/cake2.jpg')",    
      },
    },
  },
  plugins: [],
}