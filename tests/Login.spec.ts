import { test, expect } from '@playwright/test';

test('Login to Dashboard', async ({ page }) => {
  await page.goto('https://play.foodmarkethub.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Food Market Hub/);

  await page.getByRole('button', { name: 'Country Code Selector' }).click();
  
  await page.locator('ul.vti__dropdown-list').locator('li').filter({ hasText:/^Malaysia/}).click();

  // Input Mobile Number
  await page.getByRole('textbox').fill('89727500');
  // Get OTP
  await page.getByRole('button', { name: 'Get OTP' }).click();
  // Confirm Login
  await page.getByRole('button', { name: 'Confirm' }).click();
  // Expects the URL to contain Dashbaord.
  await expect(page).toHaveURL(/.*dashboard/);
});
