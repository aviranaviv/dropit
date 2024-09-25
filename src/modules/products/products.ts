import {Page} from '@playwright/test';

import siteEndpoints from '@/infrastructure/site-endpoints';
import {AddProductItemTypes} from '@/modules/products/response/types';

export class ProductsApi {
    private static instance: ProductsApi;

    static getInstance(): ProductsApi {
        if (!ProductsApi.instance) {
            ProductsApi.instance = new ProductsApi();
        }
        return ProductsApi.instance;
    }

    async addToCartResponse(page: Page): Promise<AddProductItemTypes> {
        try {
            const response = await page.waitForResponse(response =>
                response.request().method() === 'POST' && response.url().includes(siteEndpoints.cart.add)
            );

            const status = response.status();
            if (status !== 200 ) {
                throw new Error(`Failed to add to cart, status code: ${status}`);
            }

            return response.json();
        } catch (error) {
            throw new Error(`Failed to add to cart ${error}`);
        }
    }
}
