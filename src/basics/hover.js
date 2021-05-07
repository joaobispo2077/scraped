const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.goto('https://soundcloud.com/');

  await page.waitForSelector('.playableTile__artwork');

  await page.hover('.playableTile__artwork');
  await page.screenshot({ path: path.join(__dirname, '..', '..', 'tmp', 'hover.png') });

  await browser.close();
})();