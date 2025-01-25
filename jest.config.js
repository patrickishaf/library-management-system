module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [
    'node_modules/(?!(string-width|strip-ansi|ansi-regex|is-fullwidth-code-point|wrap-ansi)/)'
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'node']
};
