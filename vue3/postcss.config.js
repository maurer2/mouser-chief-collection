module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-nested': {},
    autoprefixer: {},
    cssnano: {},
    // https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475/
    '@fullhuman/postcss-purgecss': {
      content: [
        './public/**/*.html',
        './src/**/*.css',
        './src/**/*.vue',
      ],
      defaultExtractor: (content) => {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');

        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      whitelistPatterns: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!cursor-move).+-move$/, /^router-link(|-exact)-active$/],
    },
  },
};
