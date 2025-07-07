import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3005/', // Целевой сервер
        changeOrigin: true, // Изменяет заголовок Origin на целевой
        //rewrite: (path) => path.replace(/^\/api/, ''), // Удаляет префикс /api из пути ((((Это не нужно)))
      },
    },
  },
});
