import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  // Served from a GitHub Pages project site at /dental-clinic/.
  // Override with BASE_PATH=/ for root deploys (Vercel, custom domain, etc.).
  base: process.env.BASE_PATH ?? '/dental-clinic/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Keep the heavy three.js bundle in its own chunk so the rest of the
    // app stays light and the 3D hero can be lazy-loaded.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
});
