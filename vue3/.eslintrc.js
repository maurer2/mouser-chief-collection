module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/typescript/recommended',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/vue',
    'eslint-config-prettier',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/component-definition-name-casing': 'off',
    'vue/component-name-in-template-casing': 'error',
    'newline-before-return': 'error',
    'import/no-extraneous-dependencies': 'off', // vite alias fix
    'vue/no-v-for-template-key': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@data', './../data/'],
        ],
      },
    },
  },
};
