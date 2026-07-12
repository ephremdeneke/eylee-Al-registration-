/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#084d0e',
          light: '#022209',
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#F97316',
          light: '#fb923c',
          dark: '#b45309',
        },
        accent: {
          DEFAULT: '#2E7D32',
          light: '#43a047',
          dark: '#1b5e20',
        },
        brandBg: '#F8FAFC',
        brandText: '#1F2937',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

