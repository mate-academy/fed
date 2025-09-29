const stylistic = require('@stylistic/eslint-plugin');
const {
  disabledDeprecatedStylingRules,
  disabledDeprecatedStylingTypescriptRules,
  stylisticOverrides,
} = require('@mate-academy/eslint-config-internal/rules');

// Get stylistic rules configuration matching current settings
// NOTE: jsx is set to true for frontend (different from API which has jsx: false)
const stylisticRules = stylistic
  .configs
  .customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    arrowParens: true,
    braceStyle: '1tbs',
    blockSpacing: true,
    quoteProps: 'as-needed',
    commaDangle: 'always-multiline',
  })
  .rules;

const disabledDeprecatedStylingJSXRules = {
  'react/jsx-closing-bracket-location': 'off',
  'react/jsx-closing-tag-location': 'off',
  'react/jsx-curly-newline': 'off',
  'react/jsx-curly-spacing': 'off',
  'react/jsx-equals-spacing': 'off',
  'react/jsx-first-prop-new-line': 'off',
  'react/jsx-indent': 'off',
  'react/jsx-indent-props': 'off',
  'react/jsx-max-props-per-line': 'off',
  'react/jsx-newline': 'off',
  'react/jsx-one-expression-per-line': 'off',
  'react/jsx-props-no-multi-spaces': 'off',
  'react/jsx-tag-spacing': 'off',
  'react/jsx-wrap-multilines': 'off',
};

const stylisticJSXOverrides = {
  '@stylistic/jsx-closing-bracket-location': [
    'error', 'line-aligned',
  ],
  '@stylistic/jsx-closing-tag-location': 'error',
  '@stylistic/jsx-curly-brace-presence': [
    'error', { props: 'never', children: 'never' },
  ],
  '@stylistic/jsx-curly-newline': [
    'error', { multiline: 'consistent', singleline: 'consistent' },
  ],
  '@stylistic/jsx-curly-spacing': [
    'error', { when: 'never', children: true },
  ],
  '@stylistic/jsx-equals-spacing': [
    'error', 'never',
  ],
  '@stylistic/jsx-first-prop-new-line': [
    'error', 'multiline-multiprop',
  ],
  '@stylistic/jsx-indent': [
    'error', 2, { checkAttributes: true, indentLogicalExpressions: true },
  ],
  '@stylistic/jsx-indent-props': [
    'error', 2,
  ],
  '@stylistic/jsx-max-props-per-line': [
    'error', { maximum: 1, when: 'multiline' },
  ],
  '@stylistic/jsx-one-expression-per-line': [
    'error', { allow: 'single-child' },
  ],
  '@stylistic/jsx-props-no-multi-spaces': 'error',
  '@stylistic/jsx-self-closing-comp': [
    'error', { component: true, html: true },
  ],
  '@stylistic/jsx-sort-props': 'off', // Usually teams have preferences on prop ordering
  '@stylistic/jsx-tag-spacing': [
    'error',
    {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    },
  ],
  '@stylistic/jsx-wrap-multilines': [
    'error',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    },
  ],
}

const formattingRules = {
  // Turn off deprecated formatting rules (these are now handled by @stylistic)
  ...disabledDeprecatedStylingRules,
  ...disabledDeprecatedStylingTypescriptRules,

  // Turn off React-specific deprecated formatting rules that may conflict
  ...disabledDeprecatedStylingJSXRules,

  // Merge stylistic rules
  ...stylisticRules,

  // Override specific stylistic rules that need different configuration
  ...stylisticOverrides,
  // JSX-specific stylistic rules
  // NOTE: These are additional rules for JSX support that weren't in the API config
  ...stylisticJSXOverrides,
};

module.exports = {
  disabledDeprecatedStylingRules,
  disabledDeprecatedStylingTypescriptRules,
  disabledDeprecatedStylingJSXRules,
  stylisticOverrides,
  stylisticJSXOverrides,
  formattingRules,
};
  