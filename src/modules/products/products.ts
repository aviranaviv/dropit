import {Page} from '@playwright/test';

import siteEndpoints from '@/infrastructure/myshopify-site-endpoints';
import {AddProductItemTypes} from '@/modules/products/response/types';

export class ProductsApi {
    private static instance: ProductsApi;

    static getInstance(): ProductsApi {
        if (!ProductsApi.instance) {
            ProductsApi.instance = new ProductsApi();
        }
        return ProductsApi.instance;
    }

    /**
     * Handles the response after adding a product to the cart.
     * Waits for a POST request to the cart endpoint and retrieves the response.
     * @param {Page} page - The Puppeteer page object used to interact with the browser.
     * @returns {Promise<AddProductItemTypes>} A promise that resolves to the JSON response
     * containing the added product information or rejects with an error if the status is not 200.
     * @throws {Error} If the request fails or a non-200 status code is received.
     */
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
