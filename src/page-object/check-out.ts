import {Locator} from '@playwright/test';

import PageObject from '@/page-object/index';

export default class CheckOut extends PageObject {
    readonly getTotalPrice  = (price: string) => {
        return this.page.getByLabel('Cost summary').getByText(price);
    };

    readonly formContainer = this.page.locator('#checkout-main');
    readonly emailInput = this.formContainer.locator('#email');


}
