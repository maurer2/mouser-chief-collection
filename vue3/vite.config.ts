import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    base: isProd ? '/mouser-chief-collection/' : '/',
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../data', import.meta.url)),
      },
    },
    plugins: [vue(), tailwindcss()],
  };
});
