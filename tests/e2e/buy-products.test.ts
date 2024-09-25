import {expect, test} from 'playwright/test';

import {ProductAssertions} from '@/modules/products/assertions';
import {ProductSize} from '@/modules/products/constants';
import {ProductsApi} from '@/modules/products/products';
import { CheckOutApi } from "@/modules/check-out/check-out";
import Cart from '@/page-object/cart';
import CheckOut from '@/page-object/check-out';
import Navigation from '@/page-object/navigation';
import Products from '@/page-object/products';
import { scrollToTheTop } from '@/utils/utils';

import init from '../../src/infrastructure/init';

const productApi = ProductsApi.getInstance();
const checkOutApi = CheckOutApi.getInstance();
const products = ['Dropit Hamburger (QA Automation)', 'Dropit Chips (QA Automation)'];

let navigationBar: Navigation;
let productsPage: Products;
let cartPage: Cart;
let checkOutsPage: CheckOut;
let totalQuantity = 0;

test.describe('Buy Products',  () => {
    test.beforeEach(async ({page}) => {
        navigationBar = new Navigation(page);
        productsPage = new Products(page);
        cartPage = new Cart(page);
        checkOutsPage = new CheckOut(page);

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
            await scrollToTheTop(page);

            if (scenario.productTitle !== productScenarios[productScenarios.indexOf(scenario) - 1]?.productTitle) {
                await navigationBar.searchProducts(scenario.productTitle);
                await productsPage.validateProductTitle(scenario.productTitle);
            }

            totalQuantity += scenario.quantity;
            await productsPage.addProductToCart(scenario.size, scenario.quantity);
            const addToCartResponse = await productApi.addToCartResponse(page);

            ProductAssertions.validateProductAddedToCart(addToCartResponse, scenario);

            await productsPage.closeCartNotification();
        }

        const expectedCartCount = totalQuantity;
        await expect(navigationBar.cartCount).toHaveText(expectedCartCount.toString());

        await navigationBar.goToCart();
        await cartPage.goToCheckOut();

        const expectedTotalPrice = '£56.99';
        await expect(checkOutsPage.getTotalPrice(expectedTotalPrice)).toHaveText(expectedTotalPrice);

        const formAndPaymentData = {
            email: 'fake@fake.com',
            lastname: 'bob',
            address: 'fake address',
            city: 'fake city',
            cardNumber: '1',
            expirationData: '12/26',
            securityCode: '777',
            nameOnCard: 'Bogus Gateway'
        };

        await checkOutsPage.fillRequiredFields(formAndPaymentData);
        await checkOutsPage.payNowButton.click();
        const submitForCompletionResponse = await checkOutApi.submitCompletionResponse(page);

        await expect(checkOutsPage.confirmedOrderMessage).toBeVisible();
    });
});
