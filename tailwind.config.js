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
    },
  },
  plugins: [],
};
