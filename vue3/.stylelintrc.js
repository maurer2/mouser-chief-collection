module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
  ],
  rules: {
    'block-closing-brace-newline-before': 'always',
    'selector-nested-pattern': '^&',
    'at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': [
          'tailwind',
          'apply',
          'responsive',
          'variants',
          'screen'
        ]
      }
    ],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': true,
        'empty-line-between-groups': true,
    }],
  },
}
