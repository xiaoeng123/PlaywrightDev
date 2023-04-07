import { test, expect } from '@playwright/test';
import { EnterpriseLoginToDashboard } from './Login.spec';

test.describe('Update Personal Settings Tests', () => {
    test('Update Personal Settings', async ({ page }) => {
        await EnterpriseLoginToDashboard(page);
  
        await page.locator('[data-test-id="settings"]').click();
        
    });
  });