import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  workers: 1,
  reporter: 'list',
  outputDir: 'outputs/playwright',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    channel:
      process.env.PLAYWRIGHT_CHANNEL ||
      (existsSync('/Applications/Google Chrome.app') ? 'chrome' : undefined),
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    {
      name: 'mobile',
      use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
    },
  ],
});
