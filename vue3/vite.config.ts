// https://github.com/vitejs/vite/issues/279#issuecomment-634743423

const path = require('path');
import type { UserConfig } from 'vite';

const srcPath = path.resolve(__dirname, '../../data/');

const config: UserConfig = {
  resolvers: [{
    fileToRequest(filePath) {
      if (filePath.includes('data_flattened.json')) {
        console.log('json', filePath, `/@/${path.relative(srcPath, filePath)}`)
        return `/@/${path.relative(srcPath, filePath)}`;
      }
    },
    requestToFile (publicPath) {
      if (publicPath.startsWith('/@/')) {
        return path.join(srcPath, publicPath.replace(/^\/@\//, ''));
      }
    },
  }],
};

export default config;
