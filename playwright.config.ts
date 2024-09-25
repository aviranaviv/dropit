import {defineConfig} from '@playwright/test';
import {devices} from 'playwright';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: [['list', { printSteps: true }]],
    use: {
        baseURL: 'https://drpt-external-dev.myshopify.com/',
        viewport: null
    },

    projects: [
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'],
            channel: 'chrome',
            viewport: { width: 1920, height: 1080 } }
        }
    ]
});
