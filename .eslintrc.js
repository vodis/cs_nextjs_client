// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@next/next/recommended'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@/**',
            group: 'parent',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'import/no-unresolved': 'off',
  },
};
