import {expect} from 'playwright/test';

import {ProductSize} from '@/modules/products/constants';
import PageObject from '@/page-object/index';

export default class Products extends PageObject{
    readonly getProductTitle = (productTitle: string) => {
        return this.page.getByRole('heading', { name: productTitle });
    };

    readonly increaseProductQuantityIcon = this.page.getByRole('button', { name: 'Increase quantity for Dropit' });
    readonly decreaseProductQuantityIcon = this.page.getByRole('button', { name: 'Decrease quantity for Dropit' });
    readonly addToCartButton = this.page.getByRole('button', { name: 'Add to cart', exact: true});
    readonly productQuantity =  this.page.getByLabel('Quantity');
    readonly productsSize = (size: ProductSize) => {
        return this.page.getByText(size);
    };

    readonly cartNotificationCloseButton = this.page.locator('#cart-notification .icon-close');

    async selectProductSize(size: ProductSize): Promise<void> {
        await this.productsSize(size).click();
    }

    async validateProductTitle(productTitle: string): Promise<void> {
        await expect(this.getProductTitle(productTitle)).toHaveText(productTitle);
    }

    async validateProductQuantity(amount: string): Promise<void> {
        await expect(this.productQuantity).toHaveValue(amount);
    }

    async increaseProductQuantity(amount: number, currentQuantity: number): Promise<void> {
        for (let i:number = currentQuantity; i < amount; i++) {
            await this.increaseProductQuantityIcon.click();
        }
    }

    async decreaseProductQuantity(amount: number, currentQuantity: number): Promise<void> {
        for (let i: number = currentQuantity; i > amount; i--) {
            await this.decreaseProductQuantityIcon.click();
        }
    }

    async getCurrentProductQuantity(): Promise<number> {
        const currentQuantity = await this.productQuantity.inputValue();
        return parseInt(currentQuantity);
    }

    async setProductQuantity(amount: number): Promise<void> {
        const currentAmount = await this.getCurrentProductQuantity();

        if (currentAmount < amount) {
            await this.increaseProductQuantity(amount, currentAmount);
        } else if (currentAmount > amount) {
            await this.decreaseProductQuantity(amount, currentAmount);
        }

        await this.validateProductQuantity(amount.toString());
    }

    async addProductToCart(size: ProductSize, amount: number): Promise<void> {
        await this.selectProductSize(size);
        await this.setProductQuantity(amount);
        await this.addToCartButton.isEnabled();
        await this.addToCartButton.click();
    }

    async closeCartNotification(): Promise<void> {
        await this.cartNotificationCloseButton.click();
        await expect(this.cartNotificationCloseButton).not.toBeVisible();
    }
}
