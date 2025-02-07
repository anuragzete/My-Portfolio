/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      keyframes: {
        'loading-dots': {
          '0%, 20%': { content: "'\.'"},
          '40%': { content: "'\..'"},
          '60%': { content: "'\...'" },
          '80%, 100%': { content: "''" },
        },
        'cool-stuff': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'loading-dots': 'loading-dots 1s infinite steps(4)',
        'cool-stuff': 'cool-stuff 2s infinite',
      },
    },
  },
  plugins: [],
};