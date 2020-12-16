module.exports = {
  // roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/frontend'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
