export default {
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true
      }
    ]
  },
  setupFiles: ['./tests/jest.setup.ts'],
  testSequencer: './tests/sequencer.js',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'cobertura'],
  coverageProvider: 'v8',
  testTimeout: 30000,
  slowTestThreshold: 15,
  verbose: true
};
