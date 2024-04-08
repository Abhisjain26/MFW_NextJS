const nextJest = require('next/jest');
import type { InitialOptionsTsJest } from 'ts-jest/dist/types';

const createJestConfig = nextJest({
  dir: './'
});

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },
  moduleDirectories: ['node_modules', 'src']
};

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/reportWebVitals.ts',
    '!**/node_modules/**'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(swiper|ssr-window|dom7|@akinon)/)'
  ]
});
