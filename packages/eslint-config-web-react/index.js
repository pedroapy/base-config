'use strict';

const restrictedGlobals = require('confusing-browser-globals');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
    },
    plugins: ['react', 'simple-import-sort', 'import', 'promise', 'react-hooks', 'jsx-a11y', 'prettier'],
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
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:eslint-comments/recommended', 'plugin:prettier/recommended'],
            env: {
                node: true,
            },
            parser: 'esprima',
            parserOptions: {
                sourceType: 'script',
            },
        },
        {
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
            plugins: ['vitest', 'testing-library'],
            rules: {},
        },
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],

        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // Side effect imports.
                    ['^\\u0000'],

                    // Packages. `react` related packages come first.
                    ['^react', '^@?\\w'],

                    // Internal packages.
                    ['^~'],

                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

                    // Style imports.
                    ['^.+\\.s?css$'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'no-restricted-globals': ['error'].concat(restrictedGlobals),
        'import/no-cycle': 'warn',
    },
};
