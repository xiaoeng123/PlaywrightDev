import { Page, test, expect } from '@playwright/test';

// Generate an 8-digit random number
const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
// Generate a random email username
const randomUsername = Math.random().toString(36).substring(2, 8);
const domainName = 'gmail.com';
const randomEmailAddress = `${randomUsername}@${domainName}`;

function generateRandomCompanyName(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const randomIndex = Math.floor(Math.random() * letters.length);
  const randomString = letters[randomIndex].toUpperCase() + letters.slice(1, 10);
  return `${randomString} Enterprise`;
}

export async function EnterpriseLoginToDashboard(page: Page): Promise<void> {
  await page.goto('https://play.foodmarkethub.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Food Market Hub/);
    //Login
  await page.getByRole('button', { name: 'Country Code Selector' }).click();
  await page.locator('ul.vti__dropdown-list').locator('li').filter({ hasText:/^Malaysia/}).click();
  await page.getByRole('textbox').fill('89727500');
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  // Expects the URL to contain Dashbaord.
  await page.getByRole('button', { name: 'Close this dialog' }).click();
  await expect(page).toHaveURL(/.*dashboard/);
  // Validate text
  await page.getByText(/We are glad to see you*MY Enterprise!/);
};

test('EnterpriseRegistration', async ({ page }) => {
  await page.goto('https://play.foodmarkethub.com/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Food Market Hub/);
  //Login
  await page.getByRole('button', { name: 'Country Code Selector' }).click();
  await page.locator('ul.vti__dropdown-list').locator('li').filter({ hasText:/^Malaysia/}).click();
  await page.getByRole('textbox').fill(randomNumber.toString());
  await page.getByRole('button', { name: 'Get OTP' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  //Registration
  await expect(page).toHaveURL(/.*register/);
  await page.locator('label').filter({ hasText: 'Buy and sell to my outlet' }).locator('span').nth(1).click();
  await page.locator('[data-test-id="input-company-name"]').click();
  await page.locator('[data-test-id="input-company-name"]').fill(generateRandomCompanyName());
  await page.locator('[data-test-id="input-email"]').click();
  await page.locator('[data-test-id="input-email"]').fill(randomEmailAddress);
  await page.locator('[data-test-id="registration-details-form"] [data-test-id="button-confirm"]').click();
  //Subscription page
  await page.getByRole('button', { name: 'Close this dialog' }).click();
  await expect(page).toHaveURL(/.*subscription/);
  await page.getByRole('article').filter({ hasText: 'FMH Premium EnterpriseFit for multi branch restaurant company whose have central' }).locator('[data-test-id="button-current-plan"]').click();
  await page.locator('[data-test-id="button-get-free-trial-tag"]').click();
  await page.locator('[data-test-id="button-continue"]').click();
  //Redirect to Dashboard
  await page.getByRole('button', { name: 'Close this dialog' }).click();
  await expect(page).toHaveURL(/.*dashboard/);
  //await page.getByText(/We are glad to see you "${generateRandomCompanyName()}"!/);
  const companyName = (generateRandomCompanyName());
  await page.getByText(`text=/We are glad to see you ${companyName}!/`);
});

