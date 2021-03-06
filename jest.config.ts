import type { Config } from '@jest/types';

import { getJestModuleNameMapper } from './config';

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
        '\\.(sass|scss)$': '<rootDir>/config/jest/styleMock.ts',
        '\\.(jpg|jpeg|bmp|png|gif|svg)$': '<rootDir>/config/jest/fileMock.ts',
        ...getJestModuleNameMapper()
    },

    setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.ts'],

    testResultsProcessor: 'jest-sonar-reporter'
};

export default configuration;
