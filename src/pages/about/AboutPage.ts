import {type Page, expect, type Locator} from "@playwright/test";

export class AboutPage{
    private readonly aboutPageTitleLocator: Locator

    constructor(private page: Page){
        this.aboutPageTitleLocator = page.locator('h1');
    }

    async expectAboutPageTitleToBeVisible(){
        await expect(this.aboutPageTitleLocator).toBeVisible({timeout: 25000});
    }
}