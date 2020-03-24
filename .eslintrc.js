'use strict';

module.exports = {
  extends: 'semistandard',
  plugins: ['require-sort'],
  rules: {
    'prefer-const': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }],
    'require-sort/require-sort': 'error'
  },
  env: {
    browser: true
  }
};
