import { test } from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import { encrypt, decrypt } from "../utils/CryptojsUtil"
import { encryptEnvFile } from "../utils/EncryptEnvFiles";

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.USERID!));
    await loginPage.fillPassword(decrypt(process.env.PASSWORD!));

    const homePage = await loginPage.clickLoginButton();
    await page.pause();
    await homePage.expectSetupTitleToBeVisible();
});

test.skip("Sample env test", async ({ page }) => {
    const plaintext = "Hello World";

    const encryptedText = encrypt(plaintext);
    console.log("SALT: ", process.env.SALT);
    console.log("Encrypted: ", encryptedText);

    const decryptedText = decrypt(encryptedText);
    console.log("Decrypted: ", decryptedText);

    encryptEnvFile();
     
})