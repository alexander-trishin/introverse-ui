import type { Config } from '@jest/types';

const configuration: Config.InitialOptions = {
    bail: 3,
    clearMocks: true,

    collectCoverageFrom: [
        '**/src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/stories/**',
        '!**/coverage/**',
        '!**/src/index.tsx'
    ],

    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },

    maxWorkers: '50%',

    moduleNameMapper: {
        '^app(.*)$': '<rootDir>/src/app$1'
    }
};

export default configuration;
