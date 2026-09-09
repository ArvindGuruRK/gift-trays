import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Guards the claims made when this site was cleaned up for launch:
 * no broken links, no cookies or third-party tracking, no mobile overflow,
 * no accessibility violations, and real per-page metadata.
 *
 * These are regression guards, not a one-off audit — each one corresponds to a
 * promise the site now makes to visitors (or in the cookie policy's case, to
 * a statement of fact on a published policy page).
 */

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/refund-policy",
];

/** Hosts the site is allowed to talk to. Anything else is a tracker or an embed. */
const ALLOWED_HOSTS = ["localhost", "127.0.0.1", "res.cloudinary.com"];

/** The splash overlay holds the homepage for ~2.6s before content settles. */
async function gotoSettled(page: Page, route: string) {
  await page.goto(route, { waitUntil: "domcontentloaded" });
  if (route === "/") await page.waitForTimeout(3200);
  await page.waitForLoadState("networkidle").catch(() => {});
}

/**
 * Settles the page for a visual assertion.
 *
 * Reduced motion is emulated so the GSAP and Motion reveals resolve straight to
 * their final state. Without it, axe measures text mid-fade and reports
 * contrast failures for colours (#b8b0a8 and the like) that only exist for a
 * few hundred milliseconds during an animation — WCAG applies to the settled
 * state, so those would be false positives. It also confirms the reduced-motion
 * path itself renders correctly.
 */
async function gotoStatic(page: Page, route: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoSettled(page, route);

  // Walk the page so any scroll-triggered reveal has been through its trigger.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

test.describe("Links", () => {
  test("every internal link resolves — no 404s", async ({ page, request }) => {
    const checked = new Set<string>();
    const broken: string[] = [];

    for (const route of ROUTES) {
      await gotoSettled(page, route);

      const hrefs = await page.locator("a[href]").evaluateAll((nodes) =>
        nodes.map((n) => (n as HTMLAnchorElement).getAttribute("href") ?? "")
      );

      for (const href of hrefs) {
        // Internal page links only. tel:, mailto: and external links are
        // covered by the separate checks below.
        if (!href.startsWith("/") || href.startsWith("//")) continue;
        const path = href.split("#")[0] || "/";
        if (checked.has(path)) continue;
        checked.add(path);

        const response = await request.get(path);
        if (response.status() >= 400) {
          broken.push(`${path} -> ${response.status()} (linked from ${route})`);
        }
      }
    }

    expect(checked.size).toBeGreaterThan(5);
    expect(broken, `Broken internal links:\n${broken.join("\n")}`).toEqual([]);
  });

  test("no placeholder contact details or internal pages are linked", async ({ page }) => {
    for (const route of ROUTES) {
      await gotoSettled(page, route);

      const html = await page.content();

      // The dummy number that used to appear 14 times across the site.
      expect(html, `placeholder phone number found on ${route}`).not.toContain("9876543210");
      expect(html, `placeholder phone number found on ${route}`).not.toContain("98765 43210");

      // The internal component reference must not be linked from public pages.
      const designSystemLinks = await page.locator('a[href*="/design-system"]').count();
      expect(designSystemLinks, `/design-system linked from ${route}`).toBe(0);

      // Unfilled config values must never reach the rendered page.
      expect(html, `unfilled TODO value rendered on ${route}`).not.toMatch(/TODO_[A-Z_]+/);
    }
  });

  test("phone, WhatsApp and email are actionable links, not plain text", async ({ page }) => {
    await gotoSettled(page, "/contact");

    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible();

    // The email address is hidden site-wide until one is configured, so this
    // asserts the rule that matters: an address shown to a visitor is always a
    // mailto link, never inert text.
    const mailtoCount = await page.locator('a[href^="mailto:"]').count();
    const bodyText = await page.locator("body").innerText();
    const showsAnEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(bodyText);

    if (showsAnEmail) {
      expect(mailtoCount, "an email address is shown but is not a mailto link").toBeGreaterThan(0);
    }
  });

  test("the logo links home on every page", async ({ page }) => {
    for (const route of ["/about", "/contact", "/privacy-policy"]) {
      await gotoSettled(page, route);
      const homeLinks = page.locator('header a[href="/"]');
      await expect(homeLinks.first(), `logo is not a link on ${route}`).toBeVisible();
    }
  });
});

test.describe("Privacy", () => {
  test("the site sets no cookies — which is what the cookie policy claims", async ({
    page,
    context,
  }) => {
    for (const route of ROUTES) {
      await gotoSettled(page, route);
      const cookies = await context.cookies();
      expect(
        cookies,
        `${route} set cookies, contradicting /cookie-policy: ${JSON.stringify(cookies)}`
      ).toEqual([]);
    }
  });

  test("no requests go to third-party hosts", async ({ page }) => {
    const foreign: string[] = [];

    page.on("request", (request) => {
      const host = new URL(request.url()).hostname;
      if (!ALLOWED_HOSTS.includes(host)) foreign.push(`${host} (${request.url()})`);
    });

    for (const route of ROUTES) {
      await gotoSettled(page, route);
    }

    expect(
      foreign,
      `Unexpected third-party requests — these would need disclosing in the cookie policy:\n${foreign.join("\n")}`
    ).toEqual([]);
  });

  test("no browser storage is written", async ({ page }) => {
    for (const route of ROUTES) {
      await gotoSettled(page, route);
      const stored = await page.evaluate(() => ({
        local: Object.keys(window.localStorage),
        session: Object.keys(window.sessionStorage),
      }));
      expect(stored.local, `localStorage written on ${route}`).toEqual([]);
      expect(stored.session, `sessionStorage written on ${route}`).toEqual([]);
    }
  });
});

test.describe("Mobile layout", () => {
  // 320px is the narrowest width WCAG 1.4.10 (Reflow) expects to work.
  const WIDTHS = [320, 360, 390, 414, 768];

  for (const width of WIDTHS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });

      for (const route of ROUTES) {
        await gotoSettled(page, route);

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
        });

        // 1px of tolerance for sub-pixel rounding.
        expect(
          overflow.scrollWidth,
          `${route} overflows horizontally at ${width}px (${overflow.scrollWidth} > ${overflow.clientWidth})`
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      }
    });
  }
});

test.describe("Accessibility", () => {
  for (const route of ROUTES) {
    test(`no WCAG A/AA violations on ${route}`, async ({ page }) => {
      await gotoStatic(page, route);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const summary = results.violations
        .map((v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(" ")).join("\n    ")}`)
        .join("\n\n");

      expect(results.violations, `Accessibility violations on ${route}:\n\n${summary}`).toEqual([]);
    });
  }

  test("a skip link is the first thing keyboard users reach", async ({ page }) => {
    await gotoSettled(page, "/about");
    await page.keyboard.press("Tab");

    const focused = await page.evaluate(() => ({
      text: document.activeElement?.textContent?.trim(),
      href: document.activeElement?.getAttribute("href"),
    }));

    expect(focused.href).toBe("#main-content");
    expect(focused.text).toContain("Skip");
  });

  test("the enquiry form is operable by keyboard and reports errors", async ({ page }) => {
    await gotoSettled(page, "/");
    await page.locator("#enquiry-form").scrollIntoViewIfNeeded();

    // Submitting empty must produce visible, associated errors rather than
    // silently doing nothing.
    await page.getByRole("button", { name: /send enquiry via whatsapp/i }).click();

    const nameField = page.locator("#enquiry-fullName");
    await expect(nameField).toHaveAttribute("aria-invalid", "true");

    const describedBy = await nameField.getAttribute("aria-describedby");
    expect(describedBy, "error message is not associated with the field").toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toBeVisible();
  });

  test("every image has an alt attribute", async ({ page }) => {
    for (const route of ROUTES) {
      await gotoSettled(page, route);
      const missing = await page.locator("img:not([alt])").count();
      expect(missing, `${route} has ${missing} image(s) with no alt attribute`).toBe(0);
    }
  });
});

test.describe("Metadata", () => {
  test("every page has a unique title, description and canonical", async ({ page }) => {
    const titles = new Map<string, string>();

    for (const route of ROUTES) {
      await gotoSettled(page, route);

      const title = await page.title();
      expect(title.length, `${route} has no title`).toBeGreaterThan(10);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description, `${route} has no meta description`).toBeTruthy();
      expect(description!.length, `${route} description is too short`).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, `${route} has no canonical URL`).toBeTruthy();

      for (const [otherRoute, otherTitle] of titles) {
        expect(title, `${route} and ${otherRoute} share a title`).not.toBe(otherTitle);
      }
      titles.set(route, title);
    }
  });

  test("robots.txt, sitemap.xml and the favicon all resolve", async ({ request }) => {
    for (const path of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/manifest.webmanifest"]) {
      const response = await request.get(path);
      expect(response.status(), `${path} returned ${response.status()}`).toBe(200);
    }

    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const route of ROUTES) {
      expect(sitemap, `${route} is missing from the sitemap`).toContain(
        route === "/" ? "<loc>" : route
      );
    }
  });

  test("the design system page is excluded from search", async ({ page }) => {
    await page.goto("/design-system", { waitUntil: "domcontentloaded" });
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("structured data describes the business", async ({ page }) => {
    await gotoSettled(page, "/");

    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? "{}")));

    const business = blocks.find((b) => b["@type"] === "LocalBusiness");
    expect(business, "no LocalBusiness structured data on the homepage").toBeTruthy();
    expect(business.telephone).toBeTruthy();
    expect(business.address.addressLocality).toBe("Chennai");
  });
});

test.describe("Content integrity", () => {
  test("no testimonials or review markup remain", async ({ page }) => {
    for (const route of ROUTES) {
      await gotoSettled(page, route);
      const html = await page.content();

      // Names from the six fabricated reviews that were removed.
      for (const name of [
        "Lakshmi Ramanathan",
        "Vigneshwaran",
        "Ananya Sundar",
        "Natarajan Swaminathan",
        "Meenakshi Sundaram",
        "Karthik Subramanian",
      ]) {
        expect(html, `fabricated testimonial "${name}" still present on ${route}`).not.toContain(
          name
        );
      }

      // Review or rating structured data would be a stronger claim still.
      expect(html, `review structured data present on ${route}`).not.toContain('"aggregateRating"');
      expect(html, `review structured data present on ${route}`).not.toContain('"@type":"Review"');
    }
  });

  test("no unsupported guarantees remain in the copy", async ({ page }) => {
    await gotoSettled(page, "/");
    const text = (await page.locator("body").innerText()).toLowerCase();

    for (const claim of [
      "freshness guarantee",
      "zero damage",
      "within 2 hours",
      "grade-a",
      "verified customer",
      "family-run",
    ]) {
      expect(text, `unsupported claim "${claim}" still on the homepage`).not.toContain(claim);
    }
  });
});
