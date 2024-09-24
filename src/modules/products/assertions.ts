import {expect} from 'playwright/test';

export class ProductAssertions {
    static validateProductAddedToCart(response: any, options: { quantity: number,productTitle: string, size: string }) {
        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(options.quantity);
        expect(response.body.product_title).toBe(options.productTitle);
        expect(response.body.options_with_values[0].value.toLowerCase()).toEqual(options.size.toLowerCase());
    }
}
