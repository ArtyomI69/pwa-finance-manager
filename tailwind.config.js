import * as BucketsUI from './configs/tailwind/bucketsui';
import * as ShadcnUI from './configs/tailwind/shadcnui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,jsx}'],
  theme: {
    extend: {
      keyframes: { ...BucketsUI.keyframes },
      animation: { ...BucketsUI.animation },
      fontFamily: { ...BucketsUI.fontFamily },
      borderRadius: { ...ShadcnUI.borderRadius },
      colors: { ...ShadcnUI.colors, ...BucketsUI.colors },
    },
  },
  plugins: [],
};
