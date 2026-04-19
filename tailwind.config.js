/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream: '#faf6ef',
        sand: '#e8ddd0',
        terra: {
          DEFAULT: '#c0624a',
          light: '#d97d65',
        },
        bark: {
          DEFAULT: '#5c3d2e',
          light: '#8a6252',
          muted: '#9e8a7e',
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease both',
        fadeIn: 'fadeIn 0.5s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
