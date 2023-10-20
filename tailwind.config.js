/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          text: {
            main: '#ffffff',
            secondary: '#aaaaaa',
            accent: '#00ff00',
          },
          background: {
            main: '#000000',
            secondary: '#333333',
            accent: '#eeeeee',
          },
        },
        light: {
          text: {
            main: '#000000',
            secondary: '#666666',
            accent: '#00ff00',
          },
          background: {
            main: '#ffffff',
            secondary: '#f5f5f5',
            accent: '#eeeeee',
          },
        },
      },
      fontFamily: {
        sans: ['noto', 'nanum'],
      },
    },
    keyframes: {
      loader: {
        '0%': {
          'box-shadow': '-38px -12px, -14px 0, 14px 0, 38px 0',
        },
        '33%': {
          'box-shadow': '-38px 0px, -14px -12px, 14px 0, 38px 0',
        },
        '66%': {
          'box-shadow': '-38px 0px, -14px 0, 14px -12px, 38px 0',
        },
        '100%': {
          'box-shadow': '-38px 0, -14px 0, 14px 0, 38px -12px',
        },
      },
    },
    animation: {
      loading: 'loader 1s linear infinite alternate',
    },
  },
  plugins: [],
};
