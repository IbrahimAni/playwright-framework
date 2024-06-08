import { type Locator, type Page, expect } from "@playwright/test";
import logger from "../../utils/LoggerUtil";

export class BasePage{

    protected readonly hamburgerMenuLocator: Locator
    protected readonly cartBadge: Locator
    protected readonly cartLink: Locator



    constructor(protected page: Page){
        this.hamburgerMenuLocator = page.getByRole('button', { name: 'Open Menu' });
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    async clickHamburgerMenu(){
        await this.hamburgerMenuLocator.click();
        logger.info("Clicked hamburger menu");
    }

    async clickCartLink(){
        await this.cartLink.click();
        logger.info("Clicked cart link");
    }

    async verifyCartBadgeVisibility(){
        await this.cartBadge.isVisible();
        logger.info("Cart badge is visible");
    }

    async verifyCartBadgeValue(expectedValue: number){
        const cartValue = await this.getCartValue();
        expect(cartValue).toBe(expectedValue.toString());
        logger.info(`Cart badge value is ${cartValue}`);
    }

    private async getCartValue(){
        return await this.cartBadge.innerText();
    }
}