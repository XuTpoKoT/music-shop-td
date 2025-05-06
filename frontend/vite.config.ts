/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    silent: false,
    globals: true, // глобальные функции (describe, it, expect)
    environment: 'jsdom',
    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],
  },
});
