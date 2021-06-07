module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/airbnb',
    '@vue/typescript',
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
    'vue/no-template-key': 'off', // https://github.com/vuejs/vue-next/issues/1734#issuecomment-665745971
    'newline-before-return': 'error',
    'import/no-extraneous-dependencies': 'off', // vite alias fix
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
    },
  },
};
