"use strict";

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
    "ternary"
  ],
  rules: {
    // JS
    "prefer-const": "error",
    "curly": ["error", "all"],
    "no-redeclare": ["error", { "builtinGlobals": true }],
    "operator-linebreak": ["error", "before"],
    "brace-style": ["error", "1tbs"],
    "no-param-reassign": ["error", { "props": true }],
    "padding-line-between-statements": [
      "error",
      {"blankLine": "always", "prev": "*", "next": "return"},
      {"blankLine": "always", "prev": ["const", "let", "var"], "next": "*"},
      {"blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
      {"blankLine": "always", "prev": "directive", "next": "*"},
      {"blankLine": "always", "prev": "block-like", "next": "*"},
    ],
    "no-underscore-dangle": ["error", { "allow": [ "__resolveType" ] }],
    "no-useless-constructor": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "max-classes-per-file": "off",
    "max-len": ["error", 80, {
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true,
      "ignoreComments": true,
    }],
    "arrow-parens": ["error", "always"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "no-console": ["error"],
    "semi": ["error", "always"],
    "import/order": ["error", {
      "groups": [
        'builtin',
        'external',
        'internal',
        ['parent', 'sibling'],
        'index',
      ],
      'newlines-between': 'ignore',
    }],
    "multiline-ternary": ["error", "always"],
    "ternary/no-unreachable": "off",

    // typescript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
