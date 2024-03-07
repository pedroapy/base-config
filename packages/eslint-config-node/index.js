'use strict';

/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['@pedroapy/eslint-config-base'],
    env: {
        node: true,
    },
    rules: {},
};
