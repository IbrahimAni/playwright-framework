import { Page, expect } from "playwright/test";
import logger from "../utils/LoggerUtil";

export default class ContactPage {
    private readonly contactsLink = "Contacts";
    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly successMessageLocator = "Success";
    private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";

    constructor(private page: Page) { }

    async createNewContact(fname: string, lname: string) {
        await this.page.getByRole('link', { name: this.contactsLink, exact: true }).click();
        logger.info("Contacts link is clicked");

        await this.page.getByRole('button', { name: this.newButtonLocator, exact: true }).click();
        logger.info("New button is clicked");

        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name is filled as ${fname}`);

        await this.page.getByPlaceholder(this.firstNameTextFieldLocator, {exact: true}).press('Tab');
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator, {exact: true}).fill(lname);
        logger.info(`Last name is filled as ${lname}`);

        await this.page.getByRole('button', { name: this.saveButtonLocator, exact: true }).click().catch((error) => {
            logger.error(`Error clicking Save button: ${error}`);
            throw error;
        }).then(() => logger.info("Save button is clicked"));
    }

    async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string) {
        try {
            const fullName = `${fname} ${lname}`;
            await expect(this.page.getByLabel(this.successMessageLocator, { exact: true })).toBeVisible({ timeout: 25000 });
            await expect(this.page.getByLabel(this.successMessageLocator, { exact: true })).toContainText(fullName);
            logger.info(`Success message contains ${fullName} and is visible`);
    
            // await this.page.getByRole('link', { name: this.contactsLink, exact: true }).click();
        } catch (error) {
            logger.error(`Error finding the contact name ${fname} ${lname}: ${error.message}`);
            throw error;
        }
    }    
}