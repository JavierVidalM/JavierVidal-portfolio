/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          '16': 'repeat(16, minmax(0, 1fr))',
          '18': 'repeat(18, minmax(0, 1fr))',
          '25': 'repeat(25, minmax(0, 1fr))',
        },
        gridTemplateRows: {
          '16': 'repeat(16, minmax(0, 1fr))',
          '18': 'repeat(18, minmax(0, 1fr))',
          '25': 'repeat(25, minmax(0, 1fr))',
        },
      },
    },
    plugins: [],
  }