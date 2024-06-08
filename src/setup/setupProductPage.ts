import { LoginPage } from "../pages/auth/LoginPage";

const username: string = "standard_user";
const password: string = "secret_sauce";

export async function setupProductPage(page) {
    const loginPage = new LoginPage(page);
    const productPage = await loginPage.quickLogin(username, password);
    await productPage.verifyProductPageTitleToBeVisible();
    return productPage;
}