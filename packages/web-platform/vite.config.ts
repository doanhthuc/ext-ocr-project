import tailwindcss from '@tailwindcss/vite';
import tanstackRouterVite from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackRouterVite({ autoCodeSplitting: true }),
    tailwindcss(),
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr(),
  ],
  base: '/',
  server: {
    port: 3000,
  },
});
