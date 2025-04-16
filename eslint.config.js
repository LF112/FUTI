import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginPreferArrow from 'eslint-plugin-prefer-arrow';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint
  .config(
    {
      ignores: ['**/dist', '**/node_modules', '**/tailwind.config.ts', '**/public', '**/packages/wasm'],
    },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'simple-import-sort': simpleImportSort,
        'unused-imports': unusedImports,
        'prefer-arrow': eslintPluginPreferArrow,
        unicorn: eslintPluginUnicorn,
        'react-compiler': reactCompiler,
      },
      rules: {
        ...{ ...reactHooks.configs.recommended.rules, 'react-hooks/exhaustive-deps': 'off' },
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        'react-compiler/react-compiler': 'error',

        // region simple-import-sort
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react$', 'react-dom'],
              // !!! normalize.css 必须放在最前面 !!!
              ['normalize.css', '(.*).css'],
              [String.raw`^@?\w`],
              ['@/components/pages/(.*)'],
              ['@/components/ui/(.*)'],
              ['@/components/(.*)'],
              ['@/(.*)'],
              ['^[./]'],
            ],
          },
        ],
        // endregion

        // region prefer-arrow
        'prefer-arrow/prefer-arrow-functions': [
          'warn',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
            classPropertiesAllowed: false,
          },
        ],
        // endregion

        // region unused-imports
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        // endregion

        // region unicorn
        'unicorn/catch-error-name': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/import-style': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/no-negated-condition': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-unreadable-array-destructuring': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/prefer-event-target': 'off',
        'unicorn/prefer-global-this': 'off',
        'unicorn/consistent-function-scoping': 'off',
        // endregion

        // region typescript-eslint
        '@typescript-eslint/no-shadow': 0,
        '@typescript-eslint/no-unused-vars': [
          1,
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        // endregion

        // region eslint
        'arrow-body-style': ['error', 'as-needed'],
        'prefer-arrow-callback': 'error',
        // endregion
      },
    },
  )
  .concat(eslintPluginPrettierRecommended);
