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
        '@typescript-eslint/no-redeclare': ['error'],
        // note you must disable the base rule as it can report incorrect errors
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
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
