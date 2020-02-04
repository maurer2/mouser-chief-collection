const tailwindcss = require('tailwindcss');
const postcssNested = require('postcss-nested');

module.exports = {
  plugins: {
    // 'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {},
    tailwindcss: {},
    'postcss-nested': {},
  }
}
