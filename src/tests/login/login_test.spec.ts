import { test } from "@playwright/test"
import { setupProductPage } from "../../setup/setupProductPage";

test("Login user", async ({page}) => {
    await setupProductPage(page);
})

