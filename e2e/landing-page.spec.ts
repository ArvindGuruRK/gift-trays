import { test, expect } from "@playwright/test";

test.describe("Landing Page & Collections Section E2E Tests", () => {
  test("should load the home page title and check collections section", async ({ page }) => {
    await page.goto("/");

    // Verify main page title
    await expect(page).toHaveTitle(/Seer Varisai|Gift Trays/i);

    // Verify 'Our Work' heading exists
    const heading = page.locator("text=Our Seer Varisai Collections");
    await expect(heading).toBeVisible();
  });
});
