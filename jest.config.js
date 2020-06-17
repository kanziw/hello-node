module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '__tests__/.*.spec\\.(js|ts|tsx)?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
