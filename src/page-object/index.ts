import { type Page } from '@playwright/test';

export default class PageObject {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
