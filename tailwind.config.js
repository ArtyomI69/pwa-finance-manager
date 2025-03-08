import * as BucketsUI from './configs/tailwind/bucketsui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,jsx}'],
  theme: {
    extend: {
      keyframes: { ...BucketsUI.keyframes },
      animation: { ...BucketsUI.animation },
      fontFamily: { ...BucketsUI.fontFamily },
      colors: { ...BucketsUI.colors },
    },
  },
  plugins: [],
};
