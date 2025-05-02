import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    files: ['parsers/**/*.ts', 'typers/**/*.ts', 'utilities/**/*.ts', 'index.ts']
  },
  {
    extends: compat.extends('eslint:recommended', 'prettier'),

    plugins: {
      prettier
    },

    linterOptions: {
      noInlineConfig: true
    },

    languageOptions: {
      globals: {
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },

    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-duplicate-imports': 'error',
      'no-async-promise-executor': 'off',
      'no-use-before-define': 'off',
      curly: ['error', 'multi'],
      'dot-notation': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'multiline-ternary': ['error', 'always-multiline'],

      'no-extra-parens': [
        'error',
        'all',
        {
          nestedBinaryExpressions: false,
          ternaryOperandBinaryExpressions: false
        }
      ],

      'no-trailing-spaces': [
        'error',
        {
          skipBlankLines: true
        }
      ],

      'prettier/prettier': 2,
      'no-unused-vars': 'off',

      'max-len': [
        'error',
        120,
        {
          ignoreTemplateLiterals: true,
          ignoreUrls: true
        }
      ],

      'no-case-declarations': 'off'
    }
  }
]);
