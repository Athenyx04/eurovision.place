import { expect, test } from '@playwright/test'

test('index page has correct title', async ({ page }) => {
  await page.goto('/')

  // Check for main elements
  await expect(page).toHaveTitle(/Eurovision Place/)
})
