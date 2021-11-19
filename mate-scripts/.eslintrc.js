module.exports = {
  extends: '@mate-academy/eslint-config-react-typescript',
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
  },
};
