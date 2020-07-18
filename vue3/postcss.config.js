const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
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
    // https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475/
    // https://gist.github.com/LinusBorg/44b8de3455c8f3a638c4425f83fb8b12
    purgecss({
      content: ['./public/**/*.html', './src/**/*.css', './src/**/*.vue'],
      defaultExtractor: (content) => {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');

        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      whitelistPatterns: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!cursor-move).+-move$/, /^router-link(|-exact)-active$/],
    }),
    autoprefixer,
    cssnano,
  ],
  preset: {
    autoprefixer: {
      grid: true,
    },
  },
};
