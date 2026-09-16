import { test, expect } from "@playwright/test";

test.describe("Landing Page, Collections & Occasions E2E Tests", () => {
  test("should load the home page title and check collections section", async ({ page }) => {
    await page.goto("/");

    // Verify main page title
    await expect(page).toHaveTitle(/Seer Varisai|Gift Trays/i);

    // Verify 'Our Work' heading exists
    const heading = page.locator("text=Our Seer Varisai Collections");
    await expect(heading).toBeVisible();
  });

  test("collections also has its own standalone page with the same catalogue", async ({ page }) => {
    await page.goto("/collections");
    await expect(
      page.getByRole("heading", { name: "Our Seer Varisai Collections" })
    ).toBeVisible();
  });

  test("occasions has a full page beyond the homepage preview", async ({ page }) => {
    await page.goto("/occasions");
    await expect(
      page.getByRole("heading", { name: "Ceremonial Trays for Every Milestone" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Wedding Ceremonies (Kalyanam)" })).toBeVisible();
  });
});
