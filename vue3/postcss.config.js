/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssNested = require('postcss-nested'); // needed for unwrapping media queries
const postcssImport = require('postcss-import');

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    postcssImport,
    tailwindcss,
    postcssNested,
    autoprefixer,
    cssnano,
  ],
  preset: {
    autoprefixer: {
      grid: true,
    },
  },
};
