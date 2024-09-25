import {Locator} from '@playwright/test';

import urls from '@/infrastructure/urls';
import PageObject from '@/page-object/index';

export default class Navigation extends PageObject{
    readonly catalog: Locator = this.page.getByRole('link', { name: 'Catalog', exact: true });
    readonly searchIcon: Locator = this.page.getByRole('button', { name: 'Search', exact: true });
    readonly searchBar: Locator = this.page.locator('predictive-search #Search-In-Modal');
    readonly cartIcon: Locator = this.page.locator('#cart-icon-bubble');
    readonly cartCount: Locator = this.cartIcon.locator('.cart-count-bubble [aria-hidden="true"]');

    async goToCatalogSection(): Promise<void> {
        await this.catalog.click();
        await this.page.waitForURL(`**\/${urls.catalog}`);
    }

    async searchProducts(productsName: string): Promise<void> {
        await this.searchIcon.click();
        await this.searchBar.fill(productsName);
        await this.page.getByRole('link', { name: productsName }).click();
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
        await this.page.waitForURL(`**\/${urls.cart}`);
    }
}
