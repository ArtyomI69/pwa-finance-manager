import * as BucketsUI from './configs/tailwind/bucketsui';
import * as ShadcnUI from './configs/tailwind/shadcnui';
import * as Tremor from './configs/tailwind/tremor';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,tsx,jsx}'],
  theme: {
    extend: {
      keyframes: { ...BucketsUI.keyframes, ...Tremor.keyframes },
      animation: { ...BucketsUI.animation, ...Tremor.animation },
      fontFamily: { ...BucketsUI.fontFamily },
      borderRadius: { ...ShadcnUI.borderRadius },
      colors: { ...ShadcnUI.colors, ...BucketsUI.colors },
    },
  },
  plugins: [...Tremor.plugins],
};
