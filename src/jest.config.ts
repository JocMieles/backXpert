module.exports = {
  preset: 'ts-jest',
  testTimeout: 100000,
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
