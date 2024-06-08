import {test} from "@playwright/test";
import products_data from "../../data/products.json";
import { setupProductPage } from "../../setup/setupProductPage";

test.describe("Product details page", () => {
    for (const prod of products_data) {
        test(`${prod.prod_name} page details`, async ({ page }) => {
            const productPage = await setupProductPage(page);

            const productDetailPage = await productPage.clickProductImg(prod.prod_name);

            await productDetailPage.verifyProductDetailsPageVisibility(prod.prod_name);
            await productDetailPage.verifyProductImageVisibility(prod.prod_name);
            await productDetailPage.verifyProductTitleVisibilityAndValue(prod.prod_name);
            await productDetailPage.verifyProductDescriptionVisibility(prod.prod_name);
            await productDetailPage.verifyProductPriceVisibilityAndValue(prod.prod_name, prod.prod_price);
            await productDetailPage.verifyProductAddToCartButtonVisibility(prod.prod_name);
        });

        test(`${prod.prod_name} back to products page`, async ({ page }) => {
            const productPage = await setupProductPage(page);

            const productDetailPage = await productPage.clickProductTitle(prod.prod_name);
            await productDetailPage.verifyProductDetailsPageVisibility(prod.prod_name);
            await productDetailPage.clickBackToProductsButton();
            await productPage.verifyProductPageTitleToBeVisible();
        });
    }
});