import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import ContactPage from "./ContactPage";

export default class HomePage {
    private readonly setupTitleLocator = 'Setup';
    private readonly serviceTitleLocator = 'Service';
    private readonly contactsLinkLocator = 'Contacts';
    private readonly appLuncherLocator = 'App Launcher';
    private readonly serviceAppLocator = "Service";

    constructor(private page: Page) { }

    async expectSetupTitleToBeVisible() {
        await expect(this.page.getByTitle(this.setupTitleLocator, { exact: true })).toBeVisible({ timeout: 25000 }).catch((error) => {
            logger.error(`Error occurred while waiting for "Setup" title to be visible: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Setup title is visible");
        });
    };

    async selectServiceApp() {
        await this.page.getByRole('button', { name: this.appLuncherLocator, exact: true }).click();
        await this.page.getByRole('option', { name: this.serviceAppLocator, exact: true }).click();
        logger.info(`Clicked on "Service" app`);

    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitleLocator, { exact: true })).toBeVisible({ timeout: 25000 }).catch((error) => {
            logger.error(`Error occurred while waiting for "Service" title to be visible: ${error}`);
            throw error;
        }).then(() => {
            logger.info("Service title is visible");
        });
    };

    async navigateToContactTab() {
        await expect(this.page.getByRole("link", { name: this.contactsLinkLocator, exact: true })).toBeVisible();
        logger.info("Contacts Tab is visible");
        await this.page.getByRole("link", { name: this.contactsLinkLocator, exact: true }).click();
        logger.info("Clicked on Contacts Tab");

        return new ContactPage(this.page);
    }
}