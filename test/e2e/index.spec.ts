import { test, expect } from '@playwright/test'

test('index page has correct title and renders cards', async ({ page }) => {
  await page.goto('/')

  // Check for main elements
  await expect(page).toHaveTitle(/Welcome to Astro/)
  await expect(page.locator('main > h1')).toContainText('Welcome to Astro')
  await expect(page.locator('.link-card-grid')).toBeVisible()

  // Check for a specific card
  const card = page.locator('.link-card:has-text("Documentation")')
  await expect(card).toBeVisible()
  await expect(card).toContainText(
    'Learn how Astro works and explore the official API docs.'
  )
})
