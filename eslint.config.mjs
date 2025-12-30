import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import unicorn from 'eslint-plugin-unicorn';

export default withNuxt(
  prettier,
  {
    plugins: {
      unicorn
    },
    languageOptions: {
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        babelOptions: {
          parserOpts: {
            plugins: ['jsx']
          }
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'vue/no-deprecated-destroyed-lifecycle': 1,
      'vue/no-v-for-template-key-on-child': 0,
      'vue/multi-word-component-names': 0,
      'no-extra-semi': 2,
      semi: [1, 'always'],
      quotes: [1, 'single'],
      'prefer-const': 2,
      'no-var': 2,
      'no-console': 0,
      'no-const-assign': 2,
      'no-useless-escape': 1,
      'unicorn/escape-case': 1,
      camelcase: 0,
      'vue/no-dupe-keys': 1,
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      'no-async-promise-executor': 'off',
      'no-empty': 'off',
      'import/no-mutable-exports': 'off',
      'vue/no-unused-vars': 'off',
      'no-unsafe-optional-chaining': 'off',
      'vue/valid-define-props': 'off',
      'no-unused-vars': 'off', // Turn off base rule as it conflicts with TS one
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    },
    // https://github.com/nuxt/nuxt/discussions/16871

  },
  {
    // Ignore test files from ESLint
    ignores: [
      'tests/**/*.spec.js',
      'tests/**/*.spec.ts',
      '**/__tests__/**'
    ]
  }
);