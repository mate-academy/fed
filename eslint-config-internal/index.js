"use strict";

const { formattingRules } = require('./rules');

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  extends: [
    "airbnb/base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:ternary/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "ternary",
    "@stylistic",
  ],
  rules: {
    // JS
    "prefer-const": "error",
    "curly": ["error", "all"],
    "no-redeclare": ["error", { "builtinGlobals": true }],
    "no-param-reassign": ["error", { "props": true }],
    "no-underscore-dangle": ["error", { "allow": [ "__resolveType" ] }],
    "no-use-before-define": "off",
    "no-useless-constructor": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "max-classes-per-file": "off",
    "no-console": ["error"],
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],
        'index',
      ],
      pathGroups: [{
        pattern: '@*/**',
        group: 'internal',
        position: 'before',
      }],
      'newlines-between': 'ignore',
    }],
    "ternary/no-unreachable": "off",

    // typescript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/no-use-before-define": ["error", {
      "functions": false,
      "classes": false,
      "typedefs": false,
      "enums": false,
    }],
    'require-await': ['error'],

    ...formattingRules,
  },
};
