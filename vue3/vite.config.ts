// https://github.com/vitejs/vite/issues/279#issuecomment-634743423
// https://github.com/vitejs/vite/issues/279#issuecomment-635646269

import * as path from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  alias: {
    '/@data/': path.resolve(__dirname, './../data/')
  }
};

export default config;
