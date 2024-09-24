import {Locator} from '@playwright/test';

import PageObject from '@/page-object/index';

export default class Cart extends PageObject {
    readonly checkOutButton : Locator = this.page.getByRole('button', { name: 'Check out', exact: true });

    async goToCheckOut () {
        await this.checkOutButton.click();
        await this.page.waitForLoadState('load');
    }
}
