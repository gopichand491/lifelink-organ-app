import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/lifelink-organ-app/',   // GitHub Pages subpath
  server: { port: 5173 },
  build: { outDir: 'dist' },
});
