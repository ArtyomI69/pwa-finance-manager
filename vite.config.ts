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
        runtimeCaching: [
          {
            urlPattern: /\/auth\/.*/i, // Регулярное выражение для API endpoints
            handler: 'NetworkFirst', // Стратегия кэширования
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 день
              },
              networkTimeoutSeconds: 10, // Таймаут для NetworkFirst стратегии
            },
          },
          {
            urlPattern: /\/rest\/.*/i, // Регулярное выражение для API endpoints
            handler: 'NetworkFirst', // Стратегия кэширования
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 день
              },
              networkTimeoutSeconds: 10, // Таймаут для NetworkFirst стратегии
            },
          },
          {
            urlPattern: /\/storage\/.*/i, // Пример для статических файлов
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
              },
            },
          },
        ],
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
