'use strict';

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    env: {
        node: true,
    },
    parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: true,
    },
    overrides: [
        {
            files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
            plugins: ['vitest'],
            extends: ['plugin:vitest/recommended'],
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
                    ['^@?\\w'],

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
        'eslint-comments/no-unused-disable': 'error',
        'import/no-cycle': 'warn',
    },
};
