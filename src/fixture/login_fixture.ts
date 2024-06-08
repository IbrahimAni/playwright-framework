import { expect as defaultExpect, Page } from '@playwright/test';
import { test as base } from '@playwright/test';
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";

type UIPages = {
    homePage: HomePage
}

export const expect = defaultExpect;

// Define a custom fixture with page
export const test = base.extend<UIPages>({
    homePage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.USERID!));
        await loginPage.fillPassword(decrypt(process.env.PASSWORD!));

        const homePage = await loginPage.clickLoginButton();
        
        await use(homePage);
    },
});
