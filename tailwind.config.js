/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Cocon Next Arabic', 'sans-serif'],
        'display': ['Cocon Next Arabic', 'sans-serif'],
        'sans': ['Cocon Next Arabic', 'sans-serif']
      },
      colors: {
        'morocco': {
          50: '#f6f8f6',
          100: '#e3ede4',
          200: '#c8dccb',
          300: '#9fc4a5',
          400: '#70a477',
          500: '#4a7c59',
          600: '#356341',
          700: '#2a4f35',
          800: '#23402c',
          900: '#1e3527',
        },
        'gold': {
          50: '#fefdf6',
          100: '#fdf9e8',
          200: '#faf2c5',
          300: '#f6e598',
          400: '#f0d461',
          500: '#e8c038',
          600: '#d4af37',
          700: '#b8952d',
          800: '#957629',
          900: '#7a6125',
        },
        'beige': {
          50: '#faf9f6',
          100: '#f5f1e8',
          200: '#ebe3d1',
          300: '#ddd0b3',
          400: '#ccb78f',
          500: '#b8a074',
          600: '#a18c61',
          700: '#847352',
          800: '#6d5e47',
          900: '#5a4d3c',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '2rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      }
    },
  },
  plugins: [],
};