/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssNested = require('postcss-nested'); // needed for unwrapping media queries
const postcssImport = require('postcss-import');

let postcss = require('postcss');

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    {
      postcssPlugin: 'grouped',
      Once(root, { result }) {
        return postcss([
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ]).process(root, result.opts);
      },
    },
    // tailwindcss,
    autoprefixer,
    cssnano,
  ],
  preset: {
    autoprefixer: {
      grid: true,
    },
  },
};
