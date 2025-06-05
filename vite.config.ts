import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';
import { VitePWA } from 'vite-plugin-pwa';

const manifest: any = {
  theme_color: '#96ff94',
  background_color: '#ffffff',
  icons: [
    { purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
    { purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
  ],
  orientation: 'any',
  display: 'standalone',
  dir: 'auto',
  lang: 'ru',
  name: 'Финансы семьи: анализ и учёт',
  short_name: 'Финансы семьи: анализ и учёт',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({ extensions: ['.ts', '.tsx'], babelHelpers: 'bundled' }),
    react({ fastRefresh: false }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['robots.txt'],
      workbox: {
        globPatterns: ['**/*.{html,css,js,ico,png,svg,jpg}'],
      },
      manifest,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
