import {beforeEach} from 'node:test';

import { expect, test} from 'playwright/test';

import init from '../../src/infrastructure/init';

test.describe('Buy Products',  () => {
    test.beforeEach(async ({page}) => {
        await init(page);
    });

    test('Should able to buy a product', async ({page}) => {
        await page.pause();
    });
});
