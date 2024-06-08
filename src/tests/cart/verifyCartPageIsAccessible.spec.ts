import { test } from '@playwright/test';
import { setupProductPage } from '../../setup/setupProductPage';
import { CartPage } from '../../pages/cart/CartPage';

test.describe("Cart page is accessible", () => {
    test("should be accessible from the products page", async ({ page }) => {
        const productPage = await setupProductPage(page);
        await productPage.clickCartLink();

        const cartPage = new CartPage(page);
        await cartPage.verifyCartPageTitle();
        await cartPage.verifyContinueShoppingButton();
        await cartPage.verifyCheckoutButton();
        await cartPage.clickContinueShopping();

        await productPage.verifyProductPageTitleToBeVisible();
    });
})

