const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Nurfia Web Storefront
  await page.goto('https://vanhoang.mauweb68.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'public/projects/nurfia-web.png', fullPage: false });
  console.log('Saved nurfia-web.png');

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
