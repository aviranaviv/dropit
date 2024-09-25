import {Locator} from '@playwright/test';

import urls from '@/infrastructure/urls';
import PageObject from '@/page-object/index';

export default class Cart extends PageObject {
    readonly checkOutButton : Locator = this.page.getByRole('button', { name: 'Check out', exact: true });
    readonly totalPrice: Locator = this.page.locator('.totals__subtotal-value');

    async goToCheckOut() {
        await this.checkOutButton.click();
        await this.page.waitForLoadState('load');
        await this.page.waitForURL(`**/${urls.checkouts}/**`);
    }
}
