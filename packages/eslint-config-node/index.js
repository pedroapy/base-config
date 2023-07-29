'use strict';

module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    env: {
        node: true,
    },
    parserOptions: {
        project: true,
        ecmaVersion: 2022,
        warnOnUnsupportedTypeScriptVersion: true,
    },
    overrides: [
        {
            files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
            plugins: ['vitest'],
            extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
            env: {
                'jest/globals': true,
            },
        },
    ],
};
