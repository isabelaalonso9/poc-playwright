
module.exports = {
  name: 'e2e',
  globals: {
    BASE_URL: ''
  },
  globalSetup: 'jest-playwright-preset/setup',
  globalTeardown: 'jest-playwright-preset/teardown',
  setupFilesAfterEnv: [
    './jest.setup.js',
    'expect-playwright',
    'jest-extended',
    'jest-playwright-preset/lib/extends.js'
  ],
  testEnvironment: './jest-environment.js',
  runner: 'jest-playwright-preset/runner',
  testRunner: 'jest-circus/runner',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'jest-report.html',
        publicPath: './reports'
      }
    ]
  ]
}