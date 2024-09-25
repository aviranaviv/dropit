import {expect} from 'playwright/test';

import {submitForCompletionResponseTypes} from '@/modules/check-out/response/types';

export class CheckOutsAssertions {
    static validateOrderIsComplete(response: submitForCompletionResponseTypes, options: { totalPrice: string, amountOfProducts: number}) {
        expect(response.data.submitForCompletion['__typename']).toBe('SubmitSuccess');
        expect(response.data.submitForCompletion.receipt.purchaseOrder.totalAmountToPay.amount).toBe(options.totalPrice);
        expect(response.data.submitForCompletion.receipt.purchaseOrder.merchandise.merchandiseLines).toHaveLength(options.amountOfProducts);
    }
}
