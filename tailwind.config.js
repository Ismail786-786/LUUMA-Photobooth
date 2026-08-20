/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#0f0f11',
          800: '#161618',
          700: '#1e1e22',
          600: '#2a2a30',
          500: '#3a3a42',
          400: '#5a5a64',
          300: '#8a8a94',
          200: '#b8b8c0',
          100: '#e4e4e8',
        },
        gold: {
          50: '#fbf7ed',
          100: '#f5ecd0',
          200: '#ecd9a0',
          300: '#e0c068',
          400: '#d4a843',
          500: '#c08e2d',
          600: '#a06f20',
          700: '#7e5619',
          800: '#5c3f15',
          900: '#3d2a10',
        },
        accent: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
