module.exports = {
  extends: [
    'stylelint-config-standard',
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
    ]
  },
}
