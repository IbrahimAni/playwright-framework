import { test } from "@playwright/test";
import products_data from "../../data/products.json";
import { setupProductPage } from "../../setup/setupProductPage";

test.describe("Products on the product page are visible and their values are correct", () => {
    for (const prod of products_data) {
        test(`${prod.prod_name} is visible and has correct values`, async ({ page }) => {
            const productPage = await setupProductPage(page);

            await productPage.verifyProductDetailsVisibility(prod.prod_name);
            await productPage.verifyProductTitle(prod.prod_name);
            await productPage.verifyProductPrice(prod.prod_name, prod.prod_price);
        });
    }
});

test.describe("Adding items to cart", () => {
    const cartBadgeValue = 1;
    for (const prod of products_data) {
        test(`${prod.prod_name} can be added to cart`, async ({ page }) => {
            const productPage = await setupProductPage(page);

            await productPage.clickAddToCart(prod.prod_name);
            await productPage.verifyCartBadgeValue(cartBadgeValue);
        });
    }

    test("Multiple items can be added to cart", async ({ page }) => {
        const productPage = await setupProductPage(page);

        for (const prod of products_data) {
            await productPage.clickAddToCart(prod.prod_name);
        }

        await productPage.verifyCartBadgeValue(products_data.length);
    });
});
