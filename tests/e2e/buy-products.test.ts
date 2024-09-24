import {test} from 'playwright/test';

import {ProductAssertions} from '@/modules/products/assertions';
import {ProductSize} from '@/modules/products/constants';
import {ProductsApi} from '@/modules/products/products';
import Navigation from '@/page-object/navigation';
import Products from '@/page-object/products';

import init from '../../src/infrastructure/init';

const productApi = ProductsApi.getInstance();
const products = ['Dropit Hamburger (QA Automation)', 'Dropit Chips (QA Automation)'];

let navigationBar: Navigation;
let productsPage: Products;

test.describe('Buy Products',  () => {
    test.beforeEach(async ({page}) => {
        navigationBar = new Navigation(page);
        productsPage = new Products(page);

        await init(page);
    });

    test('Should be able to buy multiple products', async ({ page }) => {
        const productScenarios = [
            { productTitle: products[0], size: ProductSize.Medium, quantity: 2 },
            { productTitle: products[0], size: ProductSize.SoLargeYouCantEatIt, quantity: 1 },
            { productTitle: products[1], size: ProductSize.Large, quantity: 2 },
            { productTitle: products[1], size: ProductSize.TooMuchForYouToHandle, quantity: 1 }
        ];

        await navigationBar.goToCatalogSection();

        for (const scenario of productScenarios) {
            if (scenario.productTitle !== productScenarios[productScenarios.indexOf(scenario) - 1]?.productTitle) {
                await navigationBar.searchProducts(scenario.productTitle);
                await productsPage.validateProductTitle(scenario.productTitle);
            }

            await productsPage.addProductToCart(scenario.size, scenario.quantity);
            const addToCartResponse = await productApi.addToCartResponse(page);
            ProductAssertions.validateProductAddedToCart(addToCartResponse, scenario);
            await productsPage.closeCartNotification();
        }

        await navigationBar.goToCart();
    });
});
