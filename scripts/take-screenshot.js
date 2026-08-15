const { chromium } = require("@playwright/test");
const path = require("path");

(async () => {
  console.log("Launching Chromium to capture localhost screenshot...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000); // Wait for splash screen to clear

  const screenshotPath = path.join(process.cwd(), "public", "screenshot-landing.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  
  console.log(`Screenshot saved successfully to ${screenshotPath}`);
  await browser.close();
})();
