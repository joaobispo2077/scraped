const path = require('path')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/');
  await page.screenshot({ path: path.join(__dirname, 'tmp', 'twitter.png') });

  await browser.close();
})();