module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: [
    'node_modules/*',
    'build/*',
    '.out/*',
    '!.prettierrc.js',
    '*.min.js'
  ], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ['eslint:recommended'],
  plugins: ['promise'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.js', '**/*.html'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:prettier/recommended' // Prettier plugin,
      ],
      rules: {
        'comma-dangle': 'error',
        quotes: [
          'error',
          'single',
          { avoidEscape: true, allowTemplateLiterals: true }
        ],
        curly: ['error', 'multi-line'],
        'no-await-in-loop': 'error',
        'no-constant-binary-expression': 'error',
        'no-duplicate-imports': 'error',
        'no-promise-executor-return': 'error',
        'no-self-compare': 'error',
        eqeqeq: 'error',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules

        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/no-explicit-any': 'off',

        // I suggest this setting for requiring return types on functions only where useful
        '@typescript-eslint/explicit-function-return-type': [
          'off',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true
          }
        ]
      }
    }
  ]
};
