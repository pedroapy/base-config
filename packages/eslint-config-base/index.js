'use strict';

const { existsSync } = require('fs');
const { resolve } = require('path');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

const tsConfig = existsSync('tsconfig.json') ? resolve('tsconfig.json') : undefined;

module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
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
            extends: [
                // Basic ESLint rules
                'eslint:recommended',
                // TypeScript configuration
                'standard-with-typescript',
                // Import configuration
                'plugin:import/recommended',
                // Prettier configuration
                'plugin:prettier/recommended',
            ],
            files: ['**/*.ts?(x)'],
            parser: '@typescript-eslint/parser',
            plugins: ['simple-import-sort', 'import', 'promise', 'prettier'],
            parserOptions: {
                project: true,
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: tsConfig,
                warnOnUnsupportedTypeScriptVersion: true,
            },
            settings: {
                'import/resolver': {
                    typescript: {
                        alwaysTryTypes: true,
                        project: tsConfig,
                    },
                },
            },
            rules: {
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                        ignoreRestSiblings: true,
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

                            // Packages. `react` and libraries come first.
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
                'import/no-cycle': 'warn',
            },
        },
        {
            files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
            plugins: ['vitest'],
            extends: ['plugin:vitest/recommended'],
        },
    ],
    rules: {
        'eslint-comments/no-unused-disable': 'error',
    },
};
