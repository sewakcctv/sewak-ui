import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  snapshotPathTemplate: '{testDir}/showcase.spec.ts-snapshots/{arg}-{projectName}{ext}',
  expect: { toHaveScreenshot: { maxDiffPixels: 0 } },
  use: { baseURL: 'http://127.0.0.1:4173', colorScheme: 'light' },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: 'npm run showcase -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
