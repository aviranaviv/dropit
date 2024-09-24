import {Page} from '@playwright/test';

import urls from '@/infrastructure/urls';
import Login from '@/page-object/login';

export default async function init(page: Page, password: string = 'giclao'){
    const loginPage =  new Login(page);

    await page.goto(urls.shopifyLogin);
    await loginPage.login(password);
}
