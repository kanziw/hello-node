module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'eslint-plugin-import-order-alphabetical',
    '@typescript-eslint',
  ],
  rules: {
    semi: [ 'error', 'never' ],
    'max-len': [ 'error', { code: 120, ignoreUrls: true } ],
    'key-spacing': [ 'error', { afterColon: true, beforeColon: false } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'import-order-alphabetical/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: [
          [ 'builtin', 'external' ],
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'comma-dangle': [ 'error', 'always-multiline' ],
  },
}
