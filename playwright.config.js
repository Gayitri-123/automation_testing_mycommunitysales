const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 600000, // 10 minutes per test
  expect: { timeout: 10000 },
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    navigationTimeout: 60000, // 60 sec for navigation
    actionTimeout: 30000, // 30 sec per action
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
});
