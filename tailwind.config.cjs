/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "my-dark-cyan": "hsl(185, 75%, 39%)",
        "my-dark-blue":"hsl(229, 23%, 23%)",
        "my-dark-gry-blue": "hsl(227, 10%, 46%)",
        "my-dark-gray": "hsl(0, 0%, 59%)"
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '44rem',
        '208': '48rem',
        'nano': "0.08px",
        '0.1': "0.1px",
        '0.2': "0.2px",
        '0.3': "0.3px",
        '0.4': "0.4px",
        '0.5': "0.5px",
      }
    },
  },
  plugins: [],
}
