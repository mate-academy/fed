module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/?(*.)+(test|spec).[tj]s?(x)',
  ],
  transform: {
    '^.+\\.[j|t]s?$': 'ts-jest',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/configs/',
    '<rootDir>/bash-scripts/',
    '<rootDir>/testing/',
  ],
  setupFilesAfterEnv: ['jest-sinon'],
};
