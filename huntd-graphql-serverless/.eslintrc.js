const path = require('path');

const resolve = {
  extensions: ['.js', '.ts'],
  alias: {
    '@': path.resolve(__dirname, '.'),
  },
};

module.exports = {
  extends: [
    '@mate-academy/eslint-config-internal',
  ],
  plugins: ['@mate-academy/api'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // from typescript-eslint documentation
    // This rule extends the base eslint/no-use-before-define rule.
    // It adds support for type, interface and enum declarations.
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    camelcase: 'off',
    'class-methods-use-this': 'off',
    '@mate-academy/api/use-case-file-name-suffix': ['error'],
    '@mate-academy/api/use-case-name-suffix': ['error'],
    '@mate-academy/api/use-case-options-name': ['error'],
    '@mate-academy/api/use-case-result-name': ['error'],
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: resolve.extensions,
        map: [
          ...Object.entries(resolve.alias),
        ],
      },
      node: {
        extensions: resolve.extensions,
      },
    },
  },
};
