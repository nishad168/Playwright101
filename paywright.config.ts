import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 90000, // Increased timeout for cloud runs
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 2, // run 2 tests in parallel
  reporter: [['html'], ['list']],
  use: {
    actionTimeout: 15000,
    trace: 'on-first-retry',
  },

  projects: [
    // Local debugging project
    {
      name: 'chromium_local',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        video: 'on',
      },
    },

    // Remote TestMu AI project 1: Chrome on Windows 10
    {
      name: 'chrome_windows',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'Chrome', // Name of browser
              browserVersion: 'latest',
              'LT:Options': {
                platform: 'Windows 10',
                build: 'Playwright 101 Assignment',
                name: 'Scenario Run - Chrome on Windows 10',
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                network: true, // Enable network logs
                video: true,   // Enable video recording
                console: true, // Enable console logs
                visual: true,  // Enable screenshots/visual logs
              },
            })
          )}`,
        },
      },
    },

    // Remote TestMu AI project 2: Firefox on macOS Catalina
    {
      name: 'firefox_macos',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify({
              browserName: 'pw-firefox', // Name of browser
              browserVersion: 'latest',
              'LT:Options': {
                platform: 'macOS Sonoma',
                build: 'Playwright 101 Assignment',
                name: 'Scenario Run - Firefox on macOS Sonoma',
                user: process.env.LT_USERNAME,
                accessKey: process.env.LT_ACCESS_KEY,
                network: true, // Enable network logs
                video: true,   // Enable video recording
                console: true, // Enable console logs
                visual: true,  // Enable screenshots/visual logs
              },
            })
          )}`,
        },
      },
    },
  ],
});
