// import js from "@eslint/js";
// import globals from "globals";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
//   { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
//   pluginReact.configs.flat.recommended,
// ]);

// export default [
//   {
//     files: ["**/*.{js,jsx,ts,tsx}"],
//     extends: [
//       "eslint:recommended", // Базовые правила ESLint
//       "plugin:react/recommended", // Правила для React
//      // "plugin:@typescript-eslint/recommended", // Правила для TypeScript (если используется)
//     ],
//     rules: {
//       "no-unused-vars": "warn", // Предупреждения о неиспользуемых переменных
//       "react/prop-types": "off", // Отключение проверки PropTypes (если используете TypeScript)
//     },
//   },
// ];

import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  // Базовая конфигурация для JavaScript
  js.configs.recommended, // Импортируем конфиг напрямую

  // Настройка глобальных переменных для браузера
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Рекомендуемые правила для React
  pluginReact.configs.flat.recommended,

  // Конфигурация для Prettier
  configPrettier, // Импортируем конфиг напрямую
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // Применяется к JS/JSX файлам
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error', // Делает ошибки Prettier частью ESLint
    },
  },
];
