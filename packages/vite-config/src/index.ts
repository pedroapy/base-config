import { type ModuleFormat } from 'rollup';
import { type UserConfig } from 'vitest/dist/config';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { existsSync } from 'node:fs';

export type PackageJSON = {
    name: string;
    version: string;
    main?: string;
    module?: string;
    [key: string]: unknown;
};

export type ViteBaseConfigurationOpts = {
    globals?: Record<string, string>;
    packageJSON: PackageJSON;
    setupFiles?: string[];
    externals?: string[];
    entry?: string;
};

function getFileName(packageJSON: PackageJSON, module: ModuleFormat): string {
    switch (module) {
        case 'es':
        case 'esm':
        case 'module':
            return packageJSON.module ?? 'dist/index.esm.js';
        case 'cjs':
        case 'commonjs':
            return packageJSON.main ?? 'dist/index.cjs.js';
        default:
            return `dist/index.${module}.js`;
    }
}

export function getViteBaseConf({
    globals = {},
    packageJSON,
    setupFiles = [],
    externals = [],
    entry: entryUser,
}: ViteBaseConfigurationOpts): UserConfig {
    const existsIndexTSX = existsSync('src/index.tsx');

    const entry = entryUser ?? existsIndexTSX ? 'src/index.tsx' : 'src/index.ts';
    return {
        plugins: [tsconfigPaths(), react({ include: /\.(mdx|js|jsx|ts|tsx)$/, jsxRuntime: 'automatic' })].filter(
            Boolean,
        ),
        build: {
            lib: {
                entry,
                name: packageJSON.name,
                fileName: (format) => getFileName(packageJSON, format),
                formats: ['es', 'cjs'],
            },
            rollupOptions: {
                external: ['react', ...externals],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                        ...globals,
                    },
                },
            },
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles,
            css: true,
            clearMocks: true,
            singleThread: process.env.CI === 'true',
            coverage: {
                reportsDirectory: '.reports/coverage',
            },
        },
    };
}
