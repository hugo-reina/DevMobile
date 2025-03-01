// eslint.config.js

/** @type {import('eslint').Linter.Config} */
const config = [
  {
    languageOptions: {
      globals: {
        React: 'readonly', // Déclare React comme variable globale si nécessaire
      },
      parser: require('@typescript-eslint/parser'), // Utiliser le parser de TypeScript ici
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Activer le support JSX
        },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'), // Importer le plugin React
      'react-native': require('eslint-plugin-react-native'), // Plugin React Native
      prettier: require('eslint-plugin-prettier'), // Plugin Prettier
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'), // Plugin TypeScript
    },
    rules: {
      'prettier/prettier': 'error', // Appliquer les règles Prettier
      'react/prop-types': 'off', // Désactiver les vérifications de types de props pour React
      'react-native/no-inline-styles': 'off', // Désactiver la vérification des styles en ligne dans React Native
      'react-native/no-unused-styles': 'warn', // Avertir si des styles inutilisés sont trouvés
      '@typescript-eslint/no-unused-vars': ['error'], // Appliquer les règles pour les variables non utilisées
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Désactiver cette règle si elle n'est pas nécessaire
    },
  },
  {
    files: ['*.ts', '*.tsx'], // Appliquer ces règles spécifiquement pour les fichiers TypeScript
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Désactiver l'avertissement sur le type 'any'
    },
  },
  {
    files: ['*.tsx'], // Spécifique aux fichiers .tsx
    rules: {
      'react/react-in-jsx-scope': 'off', // Désactiver cette règle si React 17+ est utilisé
    },
  },
];

module.exports = config;
