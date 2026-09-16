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

test.describe("Splash screen", () => {
  const splash = "[data-splash-root]";

  test("plays once, then never replays while navigating the site", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // First visit of the session: the brand splash runs.
    await expect(page.locator(splash)).toBeVisible();

    // The splash is gated on hydration, which on a dev server shared with
    // other workers can run well past its own timings — allow for that.
    await page.locator(splash).waitFor({ state: "detached", timeout: 15000 });

    // Leave and come back — this is the bug: the splash used to replay here.
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // The overlay is server-rendered, so on a hard navigation it is present in
    // the HTML; the pre-paint inline script must have hidden it before the
    // browser ever painted. Asserting "hidden" rather than "absent" is the
    // point — an element that is merely removed later is exactly the flash we
    // are guarding against.
    await expect(page.locator(splash)).toBeHidden();

    // A reload is still within the session, so it stays skipped.
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator(splash)).toBeHidden();
  });

  test("actually plays the video and fills the progress bar before it lifts", async ({ page }) => {
    // Warm the route first. This test is about the splash's own choreography,
    // and a cold dev-server compile can push hydration past the component's
    // backstop, which legitimately cuts the splash short and would make this
    // measure the wrong thing.
    await page.goto("/");
    await page.evaluate(() => sessionStorage.removeItem("svt.splash.seen"));

    await page.goto("/", { waitUntil: "commit" });

    const result = await page.evaluate(async () => {
      let video: HTMLVideoElement | null = null;
      for (let i = 0; i < 300; i++) {
        video = document.querySelector("[data-splash-root] video");
        if (video) break;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
      }
      if (!video) return { error: "no video element" };

      const barPercent = () => {
        const fill = document.querySelector(
          "[data-splash-root] .h-full.bg-gradient-to-r"
        ) as HTMLElement | null;
        if (!fill?.parentElement) return 0;
        return (
          (fill.getBoundingClientRect().width /
            fill.parentElement.getBoundingClientRect().width) *
          100
        );
      };

      const t0 = performance.now();
      let lastBar = 0;
      let maxVideoTime = 0;
      let totalMs = 0;
      for (let i = 0; i < 250; i++) {
        await new Promise((r) => setTimeout(r, 40));
        maxVideoTime = Math.max(maxVideoTime, video.currentTime);
        if (!document.querySelector("[data-splash-root]")) {
          totalMs = performance.now() - t0;
          break;
        }
        const pct = barPercent();
        if (pct > 0) lastBar = pct;
      }
      return { lastBar, maxVideoTime, totalMs };
    });

    expect(result.error).toBeUndefined();

    /*
     * Branch on which path the component actually took, because both are
     * correct and which one runs depends on machine load.
     *
     * The splash is gated on hydration, and it carries a backstop measured from
     * navigation start: if the page is still hydrating after ~4s, it lifts at
     * once rather than adding its own delay on top. On a dev server sharing a
     * CPU with four other workers that path is reached routinely, so asserting
     * the normal choreography unconditionally would be flaky rather than
     * meaningful. Production numbers: 2.3s normally, ~4.1s at 6x CPU throttle.
     */
    if ((result.totalMs ?? 0) < 3900) {
      // The platter must be turning, not frozen on frame zero — the 939 KB
      // original took ~3s to reach canplay and never started before the splash
      // lifted, which is the regression this guards.
      expect(
        result.maxVideoTime ?? 0,
        "splash video should have played at least a second"
      ).toBeGreaterThan(1);

      // And the bar must read as finished rather than stopping part-way.
      expect(
        result.lastBar ?? 0,
        "progress bar should be essentially full when the splash lifts"
      ).toBeGreaterThan(90);
    } else {
      // Backstop path: the only promise is that it does not hang.
      expect(
        result.totalMs ?? 0,
        "backstop should lift the splash rather than letting it hang"
      ).toBeLessThan(9000);
    }
  });

  test("is skipped entirely when the visitor prefers reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(splash)).toBeHidden();
  });
});
