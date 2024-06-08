import { test } from '@playwright/test';
import { setupProductPage } from '../../setup/setupProductPage';

test.describe('Product Sorting Tests', () => {
    test('should sort products by price from high to low', async ({ page }) => {
        const productPage = await setupProductPage(page);

        await productPage.selectSortBy('Price (high to low)');
        await productPage.verifyProductsSorted('Price (high to low)');
    });
    
    test('should sort products by price from low to high', async ({ page }) => {
        const productPage = await setupProductPage(page);

        await productPage.selectSortBy('Price (low to high)');
        await productPage.verifyProductsSorted('Price (low to high)');
    });

    test('should sort products by name from A to Z', async ({ page }) => {
        const productPage = await setupProductPage(page);
        
        await productPage.selectSortBy('Name (A to Z)');
        await productPage.verifyProductsSorted('Name (A to Z)');
    });

    test('should sort products by name from Z to A', async ({ page }) => {
        const productPage = await setupProductPage(page);

        await productPage.selectSortBy('Name (Z to A)');
        await productPage.verifyProductsSorted('Name (Z to A)');
    });
});
