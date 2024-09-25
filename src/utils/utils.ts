import { Page } from '@playwright/test';

export async function scrollToTheTop(page: Page): Promise<void> {
    await page.evaluate(() => {
        window.scrollTo(0, 0);
    });
}
