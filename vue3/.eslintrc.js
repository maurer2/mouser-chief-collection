module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-tags-order': ['error', {
      order: [
        'template',
        'script',
        'style',
      ],
    }],
    'vue/component-definition-name-casing': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
