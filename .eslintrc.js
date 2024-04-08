module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:@akinon/projectzero/core', // DO NOT remove this config for stability
    'plugin:@akinon/projectzero/recommended' // Optional
  ],
  plugins: ['@typescript-eslint', '@akinon/projectzero'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  settings: {
    next: {
      rootDir: ['src/*/']
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
