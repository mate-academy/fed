const resolve = {
  extensions: ['.js', '.ts'],
};

module.exports = {
  extends: [
    '@mate-academy/eslint-config-internal',
  ],
  env: {
    node: true,
    mocha: true,
  },
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-redeclare': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
  },
  ignorePatterns: [
    '**/node_modules/*',
    '**/dist/*',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: resolve.extensions,
      },
    },
  },
};
