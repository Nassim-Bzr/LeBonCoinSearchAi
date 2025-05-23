/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e6f2',
          200: '#b3cde0',
          300: '#8db4ce',
          400: '#679bbc',
          500: '#2A394A', // Bleu marine principal
          600: '#253242',
          700: '#1f2a3a',
          800: '#1a2332',
          900: '#141c2a',
        },
        secondary: {
          50: '#fefcf9',
          100: '#FDF5EB', // Blanc/Beige principal
          200: '#faf0e1',
          300: '#f7ebd7',
          400: '#f4e6cd',
          500: '#f1e1c3',
          600: '#d4c7a8',
          700: '#b7ad8d',
          800: '#9a9372',
          900: '#7d7957',
        },
        accent: {
          50: '#fdf8f3',
          100: '#faf1e7',
          200: '#f5e3cf',
          300: '#f0d5b7',
          400: '#ebc79f',
          500: '#C97435', // Bronze principal
          600: '#b4662f',
          700: '#9f5829',
          800: '#8a4a23',
          900: '#753c1d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(42, 57, 74, 0.08), 0 10px 20px -2px rgba(42, 57, 74, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(42, 57, 74, 0.1), 0 2px 10px -2px rgba(42, 57, 74, 0.04)',
      },
    },
  },
  plugins: [],
} 