import { test, expect } from '@playwright/test'

test('index page has correct title', async ({ page }) => {
  await page.goto('/')

  // Check for main elements
  await expect(page).toHaveTitle(/Sorter | Eurovision Place/)
})
