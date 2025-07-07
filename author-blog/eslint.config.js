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
