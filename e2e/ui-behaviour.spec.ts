import { test, expect } from "@playwright/test";

/**
 * Regression guards for interface behaviour that looks fine in a static
 * screenshot but breaks in use: WhatsApp buttons staying on-brand, and the
 * back-to-top control.
 */

test.describe("WhatsApp actions", () => {
  test("use the brand palette with the WhatsApp logo, never a green background", async ({ page }) => {
    // WhatsApp's brand green, which clashed with the maroon/gold palette.
    const WHATSAPP_GREEN = "rgb(37, 211, 102)";

    for (const route of ["/", "/contact"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll((anchors) =>
        anchors.map((a) => ({
          label: a.getAttribute("aria-label") ?? a.textContent?.trim() ?? "",
          hasLogo: !!a.querySelector('img[src*="whatsapp.svg"]'),
          backgrounds: [a, ...a.querySelectorAll("*")].map((el) => getComputedStyle(el).backgroundColor),
        }))
      );

      expect(links.length, `${route} has no WhatsApp links`).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.hasLogo, `"${link.label}" on ${route} is missing the WhatsApp logo`).toBe(true);
        expect(link.backgrounds, `"${link.label}" on ${route} uses a WhatsApp-green background`).not.toContain(WHATSAPP_GREEN);
      }
    }
  });
});

test.describe("Back to top", () => {
  test("appears after scrolling, returns to the top, and hands keyboard focus back", async ({ page }) => {
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});

    const button = page.getByRole("button", { name: "Back to top" });
    // Hidden with visibility at the top, so it can't be tabbed to or announced.
    await expect(button).toBeHidden();

    await page.mouse.wheel(0, 2500);
    await expect(button).toBeVisible();

    // Keyboard activation: back to the top, and focus to the first control.
    await button.focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 5000 }).toBe(0);
    await expect(button).toBeHidden();
    await expect(page.locator(":focus")).toHaveAttribute("href", "#main-content");
  });
});
