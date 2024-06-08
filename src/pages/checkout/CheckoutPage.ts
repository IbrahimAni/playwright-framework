import { type Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CheckoutPage extends BasePage{
    constructor(protected page: Page) {
        super(page);
    }
}