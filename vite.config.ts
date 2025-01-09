import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react(), envCompatible()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
});