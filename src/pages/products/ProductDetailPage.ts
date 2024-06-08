import { type Locator, type Page, expect } from "@playwright/test";
import logger from "../../utils/LoggerUtil";
import { ProductPage } from "./ProductPage";

export class ProductDetailPage{
    private readonly productDetailsPageTitleLocator: Locator
    private readonly productDescriptionLocator: Locator
    private readonly productPriceLocator: Locator
    private readonly productAddToCartButtonLocator: Locator
    private readonly backToProuductsPageButton: Locator

    constructor(private page: Page){
        this.productDetailsPageTitleLocator = page.getByTestId('inventory-item-name');
        this.productDescriptionLocator = page.getByTestId('inventory-item-desc');
        this.productPriceLocator = page.getByTestId('inventory-item-price');
        this.productAddToCartButtonLocator = page.getByTestId('add-to-cart');
        this.backToProuductsPageButton = page.getByTestId('back-to-products');
    }

    private getProductImageLocator(productName: string): Locator {
        const sanitizedProductName = productName.toLowerCase().replace(/ /g, '-');
        return this.page.getByTestId(`item-${sanitizedProductName}-img`);
    }

    async verifyProductDetailsPageVisibility(productName: string){
        await expect(this.productDetailsPageTitleLocator).toHaveText(productName);
        logger.info(`Product details page for ${productName} is visible`);
    }

    async verifyProductImageVisibility(productName: string){
        await expect(this.getProductImageLocator(productName)).toBeVisible();
        logger.info(`Product image for ${productName} is visible`);
    }

    async verifyProductTitleVisibilityAndValue(productName: string){
        await expect(this.productDetailsPageTitleLocator).toHaveText(productName);
        logger.info(`Product title for ${productName} is visible`);
    }

    async verifyProductDescriptionVisibility(productName: string){
        await expect(this.productDescriptionLocator).toBeVisible();
        logger.info(`Product description for ${productName} is visible`);
    }

    async verifyProductPriceVisibilityAndValue(productName: string, productPrice: string){
        await expect(this.productPriceLocator).toBeVisible();
        logger.info(`Product price for ${productName} is visible`);
    }

    async verifyProductAddToCartButtonVisibility(productName: string){
        await expect(this.productAddToCartButtonLocator).toBeVisible();
        logger.info(`Add to cart button for ${productName} is visible`);
    }

    async clickBackToProductsButton(){
        await this.backToProuductsPageButton.click().catch((error) => {
            logger.error(`Error occurred while clicking back to products button: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Clicked back to products button");
        });

        return new ProductPage(this.page);
    }
}