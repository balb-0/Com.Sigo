/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use o preset 'ts-jest' para configurar o transformador e os padrões
  preset: 'ts-jest', 
  
  // Define o ambiente de execução como Node.js
  testEnvironment: 'node', 
  
  // O Jest deve procurar por arquivos .ts e .tsx
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],

  // Adiciona o transformador ts-jest para arquivos .ts
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  
  // Isso é importante para o seu projeto com várias pastas aninhadas
  rootDir: '.',
};