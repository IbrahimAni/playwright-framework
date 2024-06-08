import { type Page, expect, type Locator } from "@playwright/test";
import logger from "../../utils/LoggerUtil";
import { AboutPage } from "../about/AboutPage";
import { ProductDetailPage } from "./ProductDetailPage";
import { BasePage } from "../base/BasePage";

export class ProductPage extends BasePage {
    private readonly productPageTitleLocator: Locator
    private readonly productCategoryTitleLocator: Locator
    private readonly aboutMenuLocator: Locator
    private readonly allItemsLocator: Locator
    private readonly logoutLocator: Locator
    private readonly resetAppStateLocator: Locator
    private readonly selectSortLocator: Locator
    private readonly productsPriceLocator: Locator
    private readonly productsNameLocator: Locator

    constructor(protected page: Page) {
        super(page);
        this.productPageTitleLocator = page.locator('[data-test="title"]');
        this.productCategoryTitleLocator = page.locator('[data-test="title"]');
        this.aboutMenuLocator = page.locator('[data-test="about-sidebar-link"]');
        this.allItemsLocator = page.locator('[data-test="inventory-sidebar-link"]');
        this.logoutLocator = page.locator('[data-test="logout-sidebar-link"]')
        this.resetAppStateLocator = page.locator('[data-test="reset-sidebar-link"]');
        this.selectSortLocator = page.getByTestId('product-sort-container');
        this.productsPriceLocator = page.locator('inventory_item_price');
        this.productsNameLocator = page.locator('inventory_item_name');
    }

    private getProductContainer(productName: string): Locator {
        return this.page.getByTestId('inventory-item').filter({ hasText: productName });
    }

    private getProductImgLocator(productName: string): Locator {
        const sanitizedProductName = productName.toLowerCase().replace(/ /g, '-');
        return this.getProductContainer(productName).getByTestId(`inventory-item-${sanitizedProductName}-img`);
    }

    private getProductTitleLocator(productName: string): Locator {
        return this.getProductContainer(productName).getByTestId('inventory-item-name');
    }

    private getProductDescLocator(productName: string): Locator {
        return this.getProductContainer(productName).getByTestId('inventory-item-desc');
    }

    private getProductPriceLocator(productName: string): Locator {
        return this.getProductContainer(productName).getByTestId('inventory-item-price');
    }

    private getProductAddToCartLocator(productName: string): Locator {
        const sanitizedProductName = productName.toLowerCase().replace(/ /g, '-');
        return this.getProductContainer(productName).getByTestId(`add-to-cart-${sanitizedProductName}`);
    }

    async clickProductImg(productName: string) {
        await this.getProductImgLocator(productName).click().catch((error) => {
            logger.error(`Error occurred while clicking product: ${error}`);
            throw error;
        }).then(() => {
            logger.info(`Clicked product: ${productName}`);
        });

        return new ProductDetailPage(this.page);
    }

    async clickProductTitle(productName: string) {
        await this.getProductTitleLocator(productName).click().catch((error) => {
            logger.error(`Error occurred while clicking product: ${error}`);
            throw error;
        }).then(() => {
            logger.info(`Clicked product: ${productName}`);
        });

        return new ProductDetailPage(this.page);
    }

    async verifyProductDetailsVisibility(productName: string) {
        await expect(this.getProductImgLocator(productName)).toBeVisible();
        await expect(this.getProductTitleLocator(productName)).toBeVisible();
        await expect(this.getProductDescLocator(productName)).toBeVisible();
        await expect(this.getProductPriceLocator(productName)).toBeVisible();
        await expect(this.getProductAddToCartLocator(productName)).toBeVisible();
        logger.info(`Product details for ${productName} are visible`);
    }

    async verifySingleProductDetailsVisibility(productName: string) {
        await expect(this.getProductImgLocator(productName)).toBeVisible();
        await expect(this.getProductTitleLocator(productName)).toBeVisible();
        await expect(this.getProductDescLocator(productName)).toBeVisible();
        await expect(this.getProductPriceLocator(productName)).toBeVisible();
        await expect(this.getProductAddToCartLocator(productName)).toBeVisible();
        logger.info(`Product details for ${productName} are visible`);
    }

    async verifyProductTitle(productName: string) {
        await expect(this.getProductTitleLocator(productName)).toHaveText(productName);
        logger.info(`Product title for ${productName} is correct`);
    }

    async verifyProductPrice(productName: string, productPrice: string) {
        await expect(this.getProductPriceLocator(productName)).toHaveText(productPrice);
        logger.info(`Product price for ${productName} is correct`);
    }

    async verifyProductPageTitleToBeVisible() {
        await expect(this.productPageTitleLocator).toBeVisible({ timeout: 25000 }).catch((error) => {
            logger.error(`Error occurred while waiting for "Home" title to be visible: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Home title is visible");
        });
    }

    async clickHamburgerMenu() {
        await this.hamburgerMenuLocator.click().catch((error) => {
            logger.error(`Error occurred while clicking hamburger menu: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Clicked hamburger menu");
        });
    }

    async navigateToAboutPage() {
        await this.clickHamburgerMenu();
        await this.aboutMenuLocator.click().catch((error) => {
            logger.error(`Error occurred while clicking about menu: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Clicked about menu");
        });

        return new AboutPage(this.page);
    }

    async clickAddToCart(productName: string | string[]) {
        if (Array.isArray(productName)) {
            for (const name of productName) {
                await this.getProductAddToCartLocator(name).click();
                logger.info(`Added ${name} to cart`);
            }
        } else {
            await this.getProductAddToCartLocator(productName).click()
            logger.info(`Added ${productName} to cart`);
        }
    }

    async selectSortBy(sortOption: string) {
        await this.selectSortLocator.selectOption({ label: sortOption });
        logger.info(`Sorted products by ${sortOption}`);
    }

    async verifyProductsSorted(sortOption: string) {
        switch (sortOption) {
            case 'Price (high to low)':
                await this.verifyProductsSortedHighToLow();
                logger.info("Products are sorted high to low")
                break;
            case 'Price (low to high)':
                await this.verifyProductsSortedLowToHigh();
                logger.info("Products are sorted low to high")
                break;
            case 'Name (A to Z)':
                await this.verifyProductsSortedAtoZ();
                logger.info("Products are sorted A to Z")
                break;
            case 'Name (Z to A)':
                await this.verifyProductsSortedZtoA();
                logger.info("Products are sorted Z to A")
                break;
            default:
                throw new Error(`Unknown sort option: ${sortOption}`);
        }
    }

    private async getProductPrices(): Promise<number[]> {
        const pricesText = await this.productsPriceLocator.allTextContents();
        return pricesText.map(price => parseFloat(price.replace('$', '')));
    }

    private async verifyProductsSortedHighToLow() {
        const prices = await this.getProductPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    }

    private async verifyProductsSortedLowToHigh() {
        const prices = await this.getProductPrices();
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    }

    private async verifyProductsSortedAtoZ() {
        const namesText = await this.productsNameLocator.allTextContents();
        for (let i = 0; i < namesText.length - 1; i++) {
            expect(namesText[i].localeCompare(namesText[i + 1])).toBeLessThanOrEqual(0);
        }
    }

    private async verifyProductsSortedZtoA() {
        const namesText = await this.productsNameLocator.allTextContents();
        for (let i = 0; i < namesText.length - 1; i++) {
            expect(namesText[i].localeCompare(namesText[i + 1])).toBeGreaterThanOrEqual(0);
        }
    }

    async getProductPrice(productName: string) {
        return await this.getProductPriceLocator(productName).innerText();
    }
}