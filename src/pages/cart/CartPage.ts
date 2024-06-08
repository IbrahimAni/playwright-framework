import { type Locator, type Page, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import logger from "../../utils/LoggerUtil";

export class CartPage extends BasePage{
    private readonly cartPageTitle: Locator
    private readonly continueShoppingLocator: Locator
    private readonly checkoutButtonLocator: Locator
    private readonly cartItemNameLocator: Locator
    private readonly cartItemPriceLocator: Locator


    constructor(protected page: Page) {
        super(page);
        this.cartPageTitle = page.getByTestId('title');
        this.continueShoppingLocator = page.getByTestId('continue-shopping');
        this.checkoutButtonLocator = page.getByTestId('checkout');
        this.cartItemNameLocator = page.getByTestId('inventory-item-name');
        this.cartItemPriceLocator = page.getByTestId('inventory-item-price');
    }

    private getCartItemtContainer(productName: string): Locator {
        return this.page.getByTestId('inventory-item').filter({ hasText: productName });
    }

    getCartItemRemoveBtnLocater(productName: string): Locator {
        const sanitizedProductName = productName.toLowerCase().replace(/ /g, '-');
        return this.page.getByTestId(`remove-${sanitizedProductName}`);
    }

    async verifyCartPageTitle(){
        await this.cartPageTitle.isVisible();
        expect(await this.cartPageTitle.innerText()).toBe('Your Cart');
        logger.info("Cart page title is verified");
    }

    async verifyContinueShoppingButton(){
        await this.continueShoppingLocator.isVisible();
        expect(await this.continueShoppingLocator.innerText()).toBe('Continue Shopping');
        logger.info("Continue shopping button is visible");
    }

    async verifyCheckoutButton(){
        await this.checkoutButtonLocator.isVisible();
        expect(await this.checkoutButtonLocator.innerText()).toBe('Checkout');
        logger.info("Checkout button is visible");
    }

    async clickContinueShopping(){
        await this.continueShoppingLocator.click();
        logger.info("Clicked continue shopping");
    }

    async verifyCartItemName(productName: string){
        await this.getCartItemtContainer(productName).isVisible();
        expect(this.getCartItemtContainer(productName).getByTestId('inventory-item-name'));
        logger.info(`Item name ${productName} is visible`);
    }

    async verifyCartItemPriceForProduct(productName: string, productPrice: string){        
        await this.getCartItemtContainer(productName).isVisible();
        expect(this.getCartItemtContainer(productName).getByTestId('inventory-item-price'));
        logger.info(`Item price ${productPrice} is visible`);
    }

    async verifyRemoveButton(productName: string){
        const removeBtn = this.getCartItemRemoveBtnLocater(productName);
        await removeBtn.isVisible();
        expect(await removeBtn.innerText()).toContain('Remove');
        logger.info(`Remove button for ${productName} is visible`);
    }
}