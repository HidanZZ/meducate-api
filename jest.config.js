module.exports = {
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node'
}
