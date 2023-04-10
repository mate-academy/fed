"use strict";

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    "@mate-academy/eslint-config-internal",
    "./custom-rules/no-window-outside-useeffect.js"
  ],
  rules: {
    // React
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'standard/no-callback-literal': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'no-window-outside-useeffect': 'error',
    'jsx-a11y/label-has-for': ['error', {
      components: ['Label'],
      required: {
        some: ['id', 'nesting'],
      },
      allowChildren: true,
    }],
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
    'react/sort-comp': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
