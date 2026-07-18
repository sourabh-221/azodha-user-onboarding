/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  // * General Formatting
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,

  // * Arrow Function Parentheses
  arrowParens: 'always',

  // * JSX Specific
  jsxSingleQuote: true,

  // * Object/Array Formatting
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,

  // * Import Sorting (requires @trivago/prettier-plugin-sort-imports)
  importOrderParserPlugins: ['classProperties', 'typescript', 'jsx'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,

  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  tailwindStylesheet: './src/index.css',

  importOrder: [
    '^@/API/(.*)$',
    '^@/assets/(.*)$',
    '^@/Components/(.*)$',
    '^@/Features/(.*)$',
    '^@/Pages/(.*)$',
    '^@/Redux/(.*)$',
    '^@/Types/(.*)$',
    '^@/Utils/(.*)$',
    '^[../]',
    '^[./]',
  ],
};

export default config;
