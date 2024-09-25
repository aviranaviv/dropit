import { expect, test } from 'playwright/test';

import { CheckOutsAssertions } from '@/modules/check-out/assertions';
import { CheckOutApi } from '@/modules/check-out/check-out';
import { ProductAssertions } from '@/modules/products/assertions';
import { ProductSize } from '@/modules/products/constants';
import { ProductsApi } from '@/modules/products/products';
import Cart from '@/page-object/cart';
import CheckOut from '@/page-object/check-out';
import Navigation from '@/page-object/navigation';
import Products from '@/page-object/products';
import { scrollToTheTop } from '@/utils/utils';

import init from '../../src/infrastructure/init';

const productApi = ProductsApi.getInstance();
const checkOutApi = CheckOutApi.getInstance();
const products = ['Dropit Hamburger (QA Automation)', 'Dropit Chips (QA Automation)'];

const productScenarios = [
    { productTitle: products[0], size: ProductSize.Medium, quantity: 2 },
    { productTitle: products[0], size: ProductSize.SoLargeYouCantEatIt, quantity: 1 },
    { productTitle: products[1], size: ProductSize.Large, quantity: 2 },
    { productTitle: products[1], size: ProductSize.TooMuchForYouToHandle, quantity: 1 }
];

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

let navigationBar: Navigation;
let productsPage: Products;
let cartPage: Cart;
let checkOutsPage: CheckOut;
let totalQuantity = 0;

test.describe('MyShopify - Buy Products', () => {
    test.beforeEach(async ({ page }) => {
        navigationBar = new Navigation(page);
        productsPage = new Products(page);
        cartPage = new Cart(page);
        checkOutsPage = new CheckOut(page);
        totalQuantity = 0;

        await init(page);
    });

    test('Should be able to buy multiple products', async ({ page }) => {
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

        await expect(navigationBar.cartCount).toHaveText(totalQuantity.toString());

        await navigationBar.goToCart();
        const expectedCartTotalPrice = '£33.00 GBP';
        await expect(cartPage.totalPrice).toHaveText(expectedCartTotalPrice);

        await cartPage.goToCheckOut();

        const expectedTotalPrice = '56.99';
        await expect(checkOutsPage.getTotalPrice(expectedTotalPrice)).toHaveText(`£${expectedTotalPrice}`);

        await checkOutsPage.fillRequiredFields(formAndPaymentData);
        await checkOutsPage.payNowButton.click();
        const submitForCompletionResponse = await checkOutApi.submitCompletionResponse(page);

        const expectedOrderValues = {
            totalPrice: expectedTotalPrice,
            amountOfProducts: productScenarios.length
        };

        CheckOutsAssertions.validateOrderIsComplete(submitForCompletionResponse, expectedOrderValues);
        await expect(checkOutsPage.confirmedOrderMessage).toBeVisible();
    });

    test('Unable to complete the order without valid email and card number', async ({ page }) => {
        const secondProductScenarios = [productScenarios[1], productScenarios[3]];

        for (const scenario of secondProductScenarios) {
            await scrollToTheTop(page);
            await navigationBar.searchProducts(scenario.productTitle);
            await productsPage.validateProductTitle(scenario.productTitle);

            totalQuantity += scenario.quantity;
            await productsPage.addProductToCart(scenario.size, scenario.quantity);
            const addToCartResponse = await productApi.addToCartResponse(page);

            ProductAssertions.validateProductAddedToCart(addToCartResponse, scenario);
            await productsPage.closeCartNotification();
        }

        await navigationBar.goToCart();
        await expect(cartPage.totalPrice).toHaveText('£13.00 GBP');

        await cartPage.goToCheckOut();
        const invalidData = {
            ...formAndPaymentData,
            email: 'fake',
            cardNumber: '.'
        };

        await checkOutsPage.fillRequiredFields(invalidData);
        await checkOutsPage.payNowButton.click();

        const expectedErrorMessages = ['Enter a valid email', 'Enter a card number'];
        await checkOutsPage.validateFormErrorMessage(expectedErrorMessages);
    });
});
