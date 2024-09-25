import {expect} from 'playwright/test';

import {AddProductItemTypes} from '@/modules/products/response/types';

export class ProductAssertions {
    static validateProductAddedToCart(response: AddProductItemTypes, options: { quantity: number,productTitle: string, size: string }) {
        expect(response.quantity).toBe(options.quantity);
        expect(response.product_title).toBe(options.productTitle);
        expect(response.options_with_values[0].value.toLowerCase()).toEqual(options.size.toLowerCase());
    }
}
