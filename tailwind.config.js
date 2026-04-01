/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zemits: {
          gold: '#C9A84C',
          dark: '#1a1a2e',
          light: '#f8f4ef',
        },
      },
    },
  },
  plugins: [],
}
