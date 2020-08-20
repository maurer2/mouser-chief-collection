// https://github.com/vitejs/vite/issues/279#issuecomment-634743423

const path = require('path');
import type { UserConfig } from 'vite';

const srcPath = path.resolve(__dirname, '../data/');

const config: UserConfig = {
  resolvers: [{
    fileToRequest(filePath) {
      if (filePath.includes('data_flattened.json')) {
        console.log('data_flattened.json');
        console.log(srcPath, filePath);
        console.log(`/@/${path.relative(srcPath, filePath)}`)

        return `/@/../../data/data_flattened.json`
      }
    },
    requestToFile (publicPath) {
      if (publicPath.startsWith('/@/../../data/data_flattened.json')) {
        return path.join(srcPath, '/@/../../data/data_flattened.json');
      }
    },
  }],
};

export default config;
