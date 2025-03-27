/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        github: {
          blue: '#0366d6',
          darkBlue: '#0353b4',
          red: '#d73a49',
          darkRed: '#cb2431',
          gray: '#586069',
          lightGray: '#f6f8fa',
          border: '#e1e4e8',
          dark: {
            bg: '#0d1117',
            card: '#161b22',
            text: '#c9d1d9',
            border: '#30363d',
            blue: '#58a6ff',
            secondary: '#8b949e'
          }
        }
      }
    },
  },
  plugins: [],
}