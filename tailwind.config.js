import { light } from '@fortawesome/fontawesome-svg-core/import.macro';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPrimary: '#007bff',
        primary: '#5bbcff',
        lightPrimary: '#cbe0ff',
        secondary: '#fffab7',
        third: '#ffd1e3',
        fourth: '#7ea1ff',
        success: '#28a745',
        info: '#17a2b8',
        warning: '#ffc107',
        danger: '#dc3545',
        white: '#ffffff',
        gray: '#f8f9fa',
        heavyGray: '#c0c0c0',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
    plugins: [],
  }
}