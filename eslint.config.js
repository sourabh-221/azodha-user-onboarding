import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'vite.config.ts',
      'eslint.config.js',
      'prettier.config.js',
      'tailwind.config.js',
    ],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        ecmaFeatures: { jsx: true },
        // project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    files: ['**/*.{ts,tsx,js,jsx}'],

    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        }),
      ],
    },

    plugins: {
      'import-x': eslintPluginImportX,
      // 'react-hooks': reactHooks,
      'react-refresh': reactRefreshPlugin,
      'unused-imports': unusedImports,
    },

    extends: [
      eslintJs.configs.recommended,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
      reactHooks.configs.flat.recommended,
      // ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginImportX.flatConfigs.recommended,
      eslintPluginImportX.flatConfigs.typescript,
      eslintConfigPrettier,
    ],

    rules: {
      //*  React */
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: ['typeAlias', 'interface', 'class'],
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
        },
      ],

      //*Rules for Unused Imports
      'no-unused-vars': 'off',
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

      //* Import rules - keep circular dependency detection, disable order (Prettier handles)
      'import-x/no-cycle': 'warn',
      'import-x/order': 'off',
      'import-x/newline-after-import': 'off',
    },
  },
);
