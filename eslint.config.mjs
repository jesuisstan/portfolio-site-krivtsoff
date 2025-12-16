// ESLint v9 flat config in ESM format with backward-compat via FlatCompat
// Maps legacy .eslintrc-style options to flat config while preserving your rules

import { FlatCompat } from '@eslint/eslintrc';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'react-compiler/react-compiler': 'off'
    }
  },
  ...compat.config({
    extends: ['prettier'],
    ignorePatterns: ['/dist/*', '/.next/*', '/out/*', '/build/*'],
    plugins: ['prettier', 'simple-import-sort'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
          semi: true,
          trailingComma: 'none',
          singleQuote: true,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false
        }
      ],
      'import/no-unresolved': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React first
            ['^react$', '^react-dom$'],
            // Side effect imports
            ['^\u0000'],
            // Packages
            ['^@?\\w'],
            // Absolute imports with @ alias
            ['^@/'],
            // Relative imports
            [
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\./\\..*'
            ],
            // Style imports
            ['^.+\\.s?css$'],
            ['^[./]']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      'linebreak-style': ['error', 'unix'],
      'react-compiler/react-compiler': 'off'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts'
    ]
  },
  {
    files: ['src/components/NavBar.jsx'],
    rules: {
      'react-compiler/react-compiler': 'off',
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
];

export default eslintConfig;
