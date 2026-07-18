import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

const projectRootDir = resolve(__dirname);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    tailwindcss(),
  ],

  server: {
    port: 4000,
    open: true,
    host: true,
  },

  preview: {
    port: 4000,
  },

  resolve: {
    alias: {
      '@': resolve(projectRootDir, './src'),
    },
  },
});
