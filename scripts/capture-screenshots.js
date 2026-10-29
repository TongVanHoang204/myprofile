// Captures Nurfia screenshots into public/projects. Requires Playwright: npx playwright install chromium
// Usage: node scripts/capture-screenshots.js [outDir]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const out = process.argv[2] || path.join(__dirname, '..', 'public', 'projects');
const SITE = 'https://vanhoang.mauweb68.com';
const API_DOCS = 'https://web-nurfia.onrender.com/api-docs/';

const webDir = path.join(out, 'nurfia-web');
const apiDir = path.join(out, 'nurfia-api');
fs.mkdirSync(webDir, { recursive: true });
fs.mkdirSync(apiDir, { recursive: true });

const save = async (page, dir, name, opts = {}) => {
  await page.screenshot({ path: path.join(dir, `${name}.jpg`), type: 'jpeg', quality: 82, ...opts });
  console.log('saved', path.basename(dir), name);
};

const open = async (page, url, wait = 2500) => {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(wait);
};

const closePromo = async (page) => {
  const btn = page.locator('.home-promo-close').first();
  if (await btn.isVisible().catch(() => false)) {
    await btn.click();
    await page.waitForTimeout(800);
  }
};

const scrollTo = async (page, selectorOrY) => {
  if (typeof selectorOrY === 'number') {
    await page.evaluate((y) => window.scrollTo(0, y), selectorOrY);
  } else {
    await page.locator(selectorOrY).first().scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(1500);
};

(async () => {
  const browser = await chromium.launch();

  // ---------- Storefront desktop ----------
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();

  await open(page, `${SITE}/`);
  await save(page, webDir, '03-promo-popup');
  await closePromo(page);
  await scrollTo(page, 0);
  await save(page, webDir, '01-home');

  // Product tabs section on the homepage
  await scrollTo(page, 'text=New Arrival');
  await page.evaluate(() => window.scrollBy(0, -140));
  await page.waitForTimeout(1200);
  await save(page, webDir, '02-home-products');

  // Search autocomplete
  await scrollTo(page, 0);
  await page.locator('.search-btn').first().click();
  await page.waitForTimeout(800);
  await page.keyboard.type('dress', { delay: 120 });
  await page.waitForTimeout(3000);
  await save(page, webDir, '06-search-autocomplete');
  await page.keyboard.press('Escape');

  // Shop with filters
  await open(page, `${SITE}/shop`);
  await save(page, webDir, '04-shop-filters');

  // Product detail with a variant selected
  await open(page, `${SITE}/product/high-rise-straight-jeans`);
  const sizeM = page.getByRole('button', { name: 'M', exact: true }).first();
  if (await sizeM.isVisible().catch(() => false)) {
    await sizeM.click().catch(() => {});
    await page.waitForTimeout(800);
  }
  await save(page, webDir, '05-product-detail');

  // Dark mode
  await open(page, `${SITE}/shop`);
  await page.locator('.theme-toggle').first().click();
  await page.waitForTimeout(1500);
  await save(page, webDir, '07-dark-mode');
  await page.locator('.theme-toggle').first().click();

  // ---------- Storefront mobile ----------
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const m = await mobile.newPage();
  await open(m, `${SITE}/`);
  await closePromo(m);
  await save(m, webDir, '08-mobile-home');
  await open(m, `${SITE}/product/high-rise-straight-jeans`);
  await save(m, webDir, '09-mobile-product');

  // ---------- API docs ----------
  await open(page, API_DOCS, 4000);
  await save(page, apiDir, '01-swagger-overview');

  // Collapse every tag to show the full list of route groups
  const tagHeaders = page.locator('.opblock-tag-section.is-open > .opblock-tag');
  const count = await tagHeaders.count();
  for (let i = count - 1; i >= 0; i -= 1) {
    await tagHeaders.nth(i).click().catch(() => {});
  }
  await page.waitForTimeout(1200);
  await scrollTo(page, 330);
  await save(page, apiDir, '02-swagger-tags');

  // Try out GET /api/products
  await open(page, API_DOCS, 4000);
  const productsOp = page.locator('#operations-Products-get_api_products');
  await productsOp.locator('.opblock-summary').click();
  await page.waitForTimeout(800);
  await productsOp.locator('button.try-out__btn').click();
  await page.waitForTimeout(500);
  const limitInput = productsOp.locator('tr[data-param-name="limit"] input');
  if (await limitInput.isVisible().catch(() => false)) await limitInput.fill('2');
  await productsOp.locator('button.execute').click();
  await page.waitForTimeout(6000);
  await productsOp.locator('.responses-wrapper').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -60));
  await page.waitForTimeout(800);
  await save(page, apiDir, '03-swagger-try-products');

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
