import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C47FF',
        'primary-light': '#9B7DFF',
        'primary-dark': '#5835ee',
      },
    },
  },
  plugins: [],
}

export default config
