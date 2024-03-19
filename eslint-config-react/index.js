module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    '@mate-academy/eslint-config',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jsx-a11y', 'import', 'react', 'prettier'],
  rules: {
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['id', 'nesting'],
        },
        allowChildren: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'jsx-a11y/control-has-associated-label': 'off',
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-console': 'error',
    'no-param-reassign': [2, { props: true }],
    'no-shadow': ['error', { builtinGlobals: false }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': 0,
  },
};
