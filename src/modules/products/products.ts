import {Page} from '@playwright/test';

import siteEndpoints from '@/infrastructure/site-endpoints';

export class ProductsApi {
    private static instance: ProductsApi;

    static getInstance(): ProductsApi {
        if (!ProductsApi.instance) {
            ProductsApi.instance = new ProductsApi();
        }
        return ProductsApi.instance;
    }

    async addToCartResponse(page: Page): Promise<any> {
        const response = await page.waitForResponse(response =>
            response.request().method() === 'POST' && response.url().includes(siteEndpoints.cart.add)
        );

        const status = response.status();
        const responseBody = await response.json();
        return { status, body: responseBody };
    }

}
