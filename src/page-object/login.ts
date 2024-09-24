import {type Locator} from '@playwright/test';

import PageObject from '@/page-object/index';

export default class Login extends PageObject{
    readonly passwordInput: Locator = this.page.locator('#password');
    readonly enterButton: Locator = this.page.getByRole('button', { name: 'Enter' , exact: true });

    async login(password: string): Promise<void> {
        await this.passwordInput.fill(password);
        await this.enterButton.click();
    }
}
