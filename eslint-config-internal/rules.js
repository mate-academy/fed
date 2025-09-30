const stylistic = require('@stylistic/eslint-plugin');

const stylisticRules = stylistic
  .configs
  .customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: false,
    arrowParens: true,
    braceStyle: '1tbs',
    blockSpacing: true,
    quoteProps: 'as-needed',
    commaDangle: 'always-multiline',
  })
  .rules;

const disabledDeprecatedStylingRules = {
  'array-bracket-newline': 'off',
  'array-element-newline': 'off',
  'array-bracket-spacing': 'off',
  'arrow-parens': 'off',
  'arrow-spacing': 'off',
  'block-spacing': 'off',
  'brace-style': 'off',
  'comma-dangle': 'off',
  'comma-spacing': 'off',
  'comma-style': 'off',
  'computed-property-spacing': 'off',
  'dot-location': 'off',
  'eol-last': 'off',
  'func-call-spacing': 'off',
  'function-call-argument-newline': 'off',
  'function-paren-newline': 'off',
  'generator-star-spacing': 'off',
  'implicit-arrow-linebreak': 'off',
  indent: 'off',
  'jsx-quotes': 'off',
  'key-spacing': 'off',
  'keyword-spacing': 'off',
  'line-comment-position': 'off',
  'linebreak-style': 'off',
  'lines-around-comment': 'off',
  'lines-between-class-members': 'off',
  'max-len': 'off',
  'max-statements-per-line': 'off',
  'multiline-ternary': 'off',
  'new-parens': 'off',
  'newline-per-chained-call': 'off',
  'no-extra-parens': 'off',
  'no-extra-semi': 'off',
  'no-floating-decimal': 'off',
  'no-mixed-operators': 'off',
  'no-mixed-spaces-and-tabs': 'off',
  'no-multi-spaces': 'off',
  'no-multiple-empty-lines': 'off',
  'no-tabs': 'off',
  'no-trailing-spaces': 'off',
  'no-whitespace-before-property': 'off',
  'nonblock-statement-body-position': 'off',
  'object-curly-newline': 'off',
  'object-curly-spacing': 'off',
  'object-property-newline': 'off',
  'one-var-declaration-per-line': 'off',
  'operator-linebreak': 'off',
  'padded-blocks': 'off',
  'padding-line-between-statements': 'off',
  'quote-props': 'off',
  quotes: 'off',
  'rest-spread-spacing': 'off',
  semi: 'off',
  'semi-spacing': 'off',
  'semi-style': 'off',
  'space-before-blocks': 'off',
  'space-before-function-paren': 'off',
  'space-in-parens': 'off',
  'space-infix-ops': 'off',
  'space-unary-ops': 'off',
  'spaced-comment': 'off',
  'switch-colon-spacing': 'off',
  'template-curly-spacing': 'off',
  'template-tag-spacing': 'off',
  'wrap-iife': 'off',
  'yield-star-spacing': 'off',
};

const disabledDeprecatedStylingTypescriptRules = {
  // '@typescript-eslint/brace-style': 'off', // Re-enabled below
  '@typescript-eslint/comma-dangle': 'off',
  '@typescript-eslint/comma-spacing': 'off',
  '@typescript-eslint/func-call-spacing': 'off',
  '@typescript-eslint/indent': 'off',
  '@typescript-eslint/keyword-spacing': 'off',
  '@typescript-eslint/member-delimiter-style': 'off',
  '@typescript-eslint/no-extra-parens': 'off',
  '@typescript-eslint/no-extra-semi': 'off',
  '@typescript-eslint/object-curly-spacing': 'off',
  '@typescript-eslint/quotes': 'off',
  '@typescript-eslint/semi': 'off',
  '@typescript-eslint/space-before-blocks': 'off',
  '@typescript-eslint/space-before-function-paren': 'off',
  '@typescript-eslint/space-infix-ops': 'off',
  '@typescript-eslint/type-annotation-spacing': 'off',
};

const stylisticOverrides = {
  '@stylistic/function-paren-newline': [
    'error',
    'multiline-arguments',
  ],
  '@stylistic/function-call-argument-newline': [
    'error',
    'consistent',
  ],
  '@stylistic/max-len': [
    'error',
    80,
    {
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
    },
  ],
  '@stylistic/multiline-ternary': ['error', 'always'],
  '@stylistic/operator-linebreak': [
    'error',
    'before',
    {
      overrides: {
        '=': 'after',
        '+=': 'after',
        '-=': 'after',
        '*=': 'after',
        '/=': 'after',
      },
    },
  ],
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
    {
      blankLine: 'always',
      prev: ['const', 'let', 'var'],
      next: '*',
    },
    {
      blankLine: 'any',
      prev: ['const', 'let', 'var'],
      next: ['const', 'let', 'var'],
    },
    { blankLine: 'always', prev: 'directive', next: '*' },
    { blankLine: 'always', prev: 'block-like', next: '*' },
  ],
  '@stylistic/array-bracket-newline': [
    'error',
    'consistent',
  ],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/array-element-newline': ['error', 'consistent'],
  '@stylistic/function-call-spacing': ['error', 'never'],
  '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
  '@stylistic/linebreak-style': ['error', 'unix'],
  '@stylistic/lines-around-comment': [
    'error',
    {
      beforeBlockComment: false,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: true,
    },
  ],
  '@stylistic/new-parens': ['error', 'always'],
  '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
  '@stylistic/no-confusing-arrow': ['error', { allowParens: true }],
  '@stylistic/no-extra-semi': 'error',
  '@stylistic/no-floating-decimal': 'error',
  '@stylistic/no-mixed-operators': ['error', { groups: [['&&', '||']] }],
  '@stylistic/no-mixed-spaces-and-tabs': 'error',
  '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: false }],
  '@stylistic/no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 0,
    },
  ],
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-trailing-spaces': [
    'error',
    {
      skipBlankLines: false,
      ignoreComments: false,
    },
  ],
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/object-curly-newline': [
    'error',
    {
      multiline: true,
      consistent: true,
    },
  ],
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: true,
    },
  ],
  '@stylistic/padded-blocks': ['error', 'never'],
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/space-infix-ops': 'error',
  '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
  '@stylistic/spaced-comment': ['error', 'always', { markers: ['/'] }],
  '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
  '@stylistic/template-curly-spacing': ['error', 'never'],
  '@stylistic/template-tag-spacing': ['error', 'never'],
  '@stylistic/wrap-iife': [
    'error',
    'outside',
    {
      functionPrototypeMethods: true,
    },
  ],
  '@stylistic/yield-star-spacing': ['error', { before: false, after: true }],
  // Use TypeScript version of brace-style since @stylistic/curly-newline is not available in v1.8.1
  '@typescript-eslint/brace-style': [
    'error', '1tbs', {
      allowSingleLine: true,
    },
  ],
};

const formattingRules = {
  // Turn off deprecated TypeScript ESLint formatting rules
  ...disabledDeprecatedStylingRules,
  ...disabledDeprecatedStylingTypescriptRules,

  // Merge stylistic rules
  ...stylisticRules,

  // Override specific stylistic rules that need different configuration
  ...stylisticOverrides,
};

module.exports = {
  disabledDeprecatedStylingRules,
  disabledDeprecatedStylingTypescriptRules,
  stylisticOverrides,
  formattingRules,
};