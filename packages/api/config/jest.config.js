module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
};
