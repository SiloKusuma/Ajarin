module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8f1',
          100: '#ffeedc',
          200: '#ffd4ae',
          300: '#ffb27c',
          400: '#ff8d45',
          500: '#ff760f',
          600: '#f1580f',
          700: '#c7430d',
          800: '#9f340a',
          900: '#7f2c08',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(255, 152, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
