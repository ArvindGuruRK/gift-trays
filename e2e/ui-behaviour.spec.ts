import { test, expect } from "@playwright/test";

/**
 * Regression guards for interface behaviour that looks fine in a static
 * screenshot but breaks in use: WhatsApp buttons staying on-brand.
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
