'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.BABEL_ENV = process.env.BABEL_ENV || 'development';

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
    },
    plugins: ['@typescript-eslint', 'react', 'import', 'jsx-a11y', 'react-hooks'],
    env: {
        browser: true,
        commonjs: true,
        jest: true,
        es6: true,
        node: true,
    },

    settings: {
        react: {
            version: 'detect',
        },
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
