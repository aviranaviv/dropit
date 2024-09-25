import {Locator} from '@playwright/test';

import PageObject from '@/page-object/index';

export default class CheckOut extends PageObject {
    readonly getTotalPrice  = (price: string) => {
        return this.page.getByLabel('Cost summary').getByText(price);
    };

    readonly formContainer: Locator = this.page.locator('#checkout-main');
    readonly emailInput: Locator = this.formContainer.locator('#email');
    readonly lastname: Locator = this.formContainer.locator('#TextField1');
    readonly address: Locator = this.formContainer.locator('#TextField2');
    readonly city: Locator = this.formContainer.locator('#TextField5');
    readonly cardNumber: Locator = this.formContainer.frameLocator('iframe[name^="card-fields-number-"]')
        .getByPlaceholder('Card number', { exact: true });

    readonly expirationData: Locator = this.formContainer.frameLocator('iframe[name^="card-fields-expiry-"]')
        .getByPlaceholder('Expiration date (MM / YY)', { exact: true });

    readonly securityCode: Locator = this.formContainer.frameLocator('iframe[name^="card-fields-verification_value-"]')
        .getByPlaceholder('Security code', { exact: true });

    readonly nameOnCard: Locator = this.formContainer.frameLocator('iframe[name^="card-fields-name-"]')
        .getByPlaceholder('Name on card', { exact: true });

    readonly payNowButton: Locator = this.formContainer.locator('#checkout-pay-button');
    readonly confirmedOrderMessage: Locator = this.page.getByRole('heading', { name: 'Your order is confirmed', exact: true });

    async fillRequiredFields (options: {
        email: string,
        lastname: string,
        address: string,
        city: string,
        cardNumber: string,
        expirationData: string,
        securityCode: string,
        nameOnCard: string
    }): Promise<void> {
        await this.emailInput.fill(options.email);
        await this.lastname.fill(options.lastname);
        await this.address.fill(options.address);
        await this.city.fill(options.city);
        await this.cardNumber.fill(options.cardNumber);
        await this.expirationData.fill(options.expirationData);
        await this.securityCode.fill(options.securityCode);
        await this.nameOnCard.fill(options.nameOnCard);
    }
}
