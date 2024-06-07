import { test, expect } from '@playwright/test';
import logger from '../utils/LoggerUtil';
import LoginPage from '../pages/LoginPage';
import { decrypt } from '../utils/CryptojsUtil';
import contacts_data from '../data/contacts.json';
import { convertToJson } from '../helpers/convert_csv_to_json';
import { exportToCsv, exportToJson, generateUserTestDataArr } from '../utils/FakerDataUtil';

for (const contact of contacts_data) {
    test(`Advance DD test for ${contact.firstname}`, async ({ page }) => {
        logger.info("Test for Contact Creation is started...");

        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));

        const homePage = await loginPage.clickLoginButton();
        await homePage.expectSetupTitleToBeVisible();
        await homePage.selectServiceApp();
        await homePage.expectServiceTitleToBeVisible();

        const contactsPage = await homePage.navigateToContactTab();
        await contactsPage.createNewContact(contact.firstname, contact.lastname);
        await page.pause();
        await contactsPage.expectContactLabelContainsFirstNameAndLastName(
            contact.firstname,
            contact.lastname
        );
        logger.info("Test for Contact Creation is completed");
    });

}

test.skip("simple DD test", async ({ page }) => {
    logger.info("Test for Contact Creation is started...");
    const fname = "Shiva";
    const lname = "Rudra";

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectSetupTitleToBeVisible();
    await homePage.selectServiceApp();
    await homePage.expectServiceTitleToBeVisible();

    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(fname, lname);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(
        fname,
        lname
    );
    logger.info("Test for Contact Creation is completed");
});

test.skip("csv to json", async () => {
    convertToJson("data.csv", "datademo.json");
});

test("faker", ({ page }) => {
    const testData = generateUserTestDataArr(10);

    exportToJson(testData, "testdata_en.json");

    exportToCsv(testData, "testdata_en.csv");
});