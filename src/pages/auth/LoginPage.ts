import { type Page, type Locator } from "@playwright/test"
import {ProductPage} from "../products/ProductPage"
import logger from "../../utils/LoggerUtil"

export class LoginPage {
    private readonly usernameInputLocator : Locator
    private readonly passwordInputLocator : Locator
    private readonly loginButtonLocator : Locator

    constructor(private page: Page) { 
        this.usernameInputLocator = page.getByPlaceholder('Username');
        this.passwordInputLocator = page.getByPlaceholder('Password');
        this.loginButtonLocator = page.getByRole('button', {name: 'Login'});
    }

    async navigateToLoginPage() {
        await this.page.goto('/');
        logger.info("Navigated to login page");
    }

    async fillUsername(username: string) {
        await this.usernameInputLocator.fill(username)
        logger.info(`Filled username`);
    }

    async fillPassword(password: string) {
        await this.passwordInputLocator.fill(password)
        logger.info(`Filled password`);
    }

    async quickLogin(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();

        return new ProductPage(this.page);
    }

    async clickLoginButton() {
        await this.loginButtonLocator.click().catch((error) => {
            logger.error(`Error occurred while clicking login button: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Clicked login button");
        });

        return new ProductPage(this.page);
    }
}