import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import unicorn from 'eslint-plugin-unicorn'

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
      'no-unused-vars': [
        2,
        {
          vars: 'all',
          args: 'after-used'
        }
      ],
      'no-irregular-whitespace': 0,
      'no-trailing-spaces': 1,
      'no-undef': 2,
      curly: 0,
      'space-before-function-paren': 0,
      'import/no-mutable-exports': 1,
      'new-cap': 1,
      'unicorn/escape-case': 1,
      camelcase: 0,
      'vue/no-dupe-keys': 1,
      '@typescript-eslint/consistent-type-imports': 'off'
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