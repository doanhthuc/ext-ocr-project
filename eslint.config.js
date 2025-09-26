import jslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';

export default tslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/*.js',
      '**/*.mjs',
      '.storybook',
    ],
  },
  {
    extends: [
      jslint.configs.recommended,
      ...tslint.configs.recommended,
      ...tslint.configs.stylistic,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          internalPattern: [
            '~/.*',
            '~icons',
            '~router',
            '~shared/.*',
            '~config/.*',
            '~api/.*',
            '~styles/.*',
          ],
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            'side-effect',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-exports': ['error', { type: 'alphabetical' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-unused-expressions': 'off',
      'prefer-template': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    },
  },
  // React-specific rules for packages that use React
  {
    extends: [react.configs.flat.recommended],
    files: [
      'packages/web-platform/**/*.{ts,tsx}',
      'packages/mobile-platform/**/*.{ts,tsx}',
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Please use absolute import instead relative import.',
            },
            {
              group: ['react-router-dom'],
              importNames: [
                'Navigate',
                'Link',
                'redirect',
                'useParams',
                'useNavigate',
              ],
              message:
                "Please import from '@/router' instead of 'react-router-dom'.",
            },
            {
              group: ['clsx', 'tailwind-merge'],
              message:
                "Please import 'cn' from '@shared/utils/cn.util' instead.",
            },
          ],
        },
      ],
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
