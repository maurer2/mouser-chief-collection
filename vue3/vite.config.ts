import * as path from 'path';
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config: UserConfig = {
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, './../data/'),
    },
  },
  plugins: [vue()],
};

export default config;
