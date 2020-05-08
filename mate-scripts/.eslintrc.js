module.exports = {
  extends: '@mate-academy/eslint-config',
  rules: {
    'max-len': ['error', {
      ignoreStrings: true,
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: {
        consistent: true,
        minProperties: 4,
      },
    }],
  }
};
