import {expect} from 'playwright/test';

import {AddProductItemTypes} from '@/modules/products/response/types';

export class ProductAssertions {
    /**
     * Validates that the product added to the cart matches the expected values.
     * @param {AddProductItemTypes} response - The response object containing details of the added product.
     * @param {Object} options - The options object to validate the added product against.
     * @param {number} options.quantity - The expected quantity of the product.
     * @param {string} options.productTitle - The expected title of the product.
     * @param {string} options.size - The expected size of the product.
     * @throws {Error} If the actual values in the response do not match the expected values.
     */
    static validateProductAddedToCart(response: AddProductItemTypes, options: { quantity: number,productTitle: string, size: string }) {
        expect(response.quantity).toBe(options.quantity);
        expect(response.product_title).toBe(options.productTitle);
        expect(response.options_with_values[0].value.toLowerCase()).toEqual(options.size.toLowerCase());
    }
}
