// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
    extends: [
        'next/core-web-vitals',
        'plugin:@next/next/recommended'
    ],
    parserOptions: { tsconfigRootDir: __dirname },
    rules: {
        "react/no-unescaped-entities": "off",
    }
};
