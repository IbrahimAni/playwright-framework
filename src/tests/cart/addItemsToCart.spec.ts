import { test } from '@playwright/test';
import { setupProductPage } from '../../setup/setupProductPage';
import { CartPage } from '../../pages/cart/CartPage';

test.describe('Adding items to cart', () => {
    test('should add single item to cart and verify details', async ({ page }) => {
        const productPage = await setupProductPage(page);

        const prodName = 'Sauce Labs Backpack';
        await productPage.clickAddToCart(prodName);
        await productPage.verifyCartBadgeValue(1);
        const productPrice = await productPage.getProductPrice(prodName);
        productPage.clickCartLink();

        const cartPage = new CartPage(page);
        await page.waitForTimeout(1000);
        cartPage.verifyCartItemName(prodName);
        cartPage.verifyCartItemPriceForProduct(prodName, productPrice);
        await cartPage.verifyRemoveButton(prodName);
    })

    test('should add multiple items to cart and verify details', async ({ page }) => {
        const productPage = await setupProductPage(page);

        const itesmToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];
        let productPrice: string[] = [];

        await productPage.clickAddToCart(itesmToAdd);
        await productPage.verifyCartBadgeValue(itesmToAdd.length);
        for (const item of itesmToAdd) {
            productPrice.push(await productPage.getProductPrice(item));
        }
        productPage.clickCartLink();

        const cartPage = new CartPage(page);
        await page.waitForTimeout(1000);
        for (let i = 0; i < itesmToAdd.length; i++) {
            await cartPage.verifyCartItemName(itesmToAdd[i]);
            await cartPage.verifyCartItemPriceForProduct(itesmToAdd[i], productPrice[i]);
            await cartPage.verifyRemoveButton(itesmToAdd[i]);
        }
    })
});

