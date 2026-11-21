import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));
const logo = 'data:image/png;base64,' + readFileSync(here('../public/hmf-logo.png')).toString('base64');

// Absolute /public paths don't resolve inside a hosted preview page; inline the logo.
const inlinePublicAssets = (): Plugin => ({
  name: 'hmf-preview-inline-assets',
  enforce: 'pre',
  transform(code, id) {
    if (!id.includes('/app/') || !code.includes('/hmf-logo.png')) return;
    return code.replaceAll('"/hmf-logo.png"', JSON.stringify(logo));
  },
});

export default defineConfig({
  root: here('.'),
  base: './',
  plugins: [inlinePublicAssets(), react()],
  css: { postcss: here('..') },
  resolve: {
    alias: [
      { find: 'cloudflare:workers', replacement: here('./src/shims/cloudflare-workers.ts') },
      { find: 'next/headers', replacement: here('./src/shims/next-headers.ts') },
      { find: 'next/navigation', replacement: here('./src/shims/next-navigation.ts') },
      { find: /^@\//, replacement: here('../') },
    ],
  },
  build: {
    outDir: here('./dist'),
    emptyOutDir: true,
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
