import {Page} from '@playwright/test';

import urls from '@/infrastructure/urls';

export default async function init(page: Page, password: string = 'giclao'){
    await page.goto(urls.shopifyLogin);
}
