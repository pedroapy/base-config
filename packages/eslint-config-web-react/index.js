'use strict';
const { existsSync } = require('fs');
const { resolve } = require('path');
const restrictedGlobals = require('confusing-browser-globals');

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

const tsConfig = existsSync('tsconfig.json') ? resolve('tsconfig.json') : undefined;

module.exports = {
    root: true,
    extends: [
        '@pedroapy/eslint-config-base',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier'],
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
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
            plugins: ['vitest', 'testing-library'],
            rules: {},
        },
    ],
    rules: {
        'no-restricted-globals': ['error'].concat(restrictedGlobals),
    },
};
