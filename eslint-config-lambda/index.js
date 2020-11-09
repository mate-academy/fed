"use strict";

module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-trailing-spaces': 'error',
    'max-len': ['error', {
      code: 80,
      comments: 80,
    }],
    semi: ['error', 'always'],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    'space-before-function-paren': ['error', 'never'],
    'no-var': 'error',
    'prefer-const': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'no-shadow': ['error', { builtinGlobals: true, hoist: 'all', allow: [] }],
    'no-redeclare': ['error', { builtinGlobals: true }],
    'no-param-reassign': 'error',
    'operator-linebreak': ['error', 'before'],
    'standard/no-callback-literal': 0,
    'import/prefer-default-export': 0,
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['return', 'block-like', 'multiline-expression'] },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'brace-style': ['error', '1tbs'],
    'object-curly-newline': [2, {
      ObjectExpression: {
        consistent: true,
        minProperties: 2,
      },
    }],
  },
};
