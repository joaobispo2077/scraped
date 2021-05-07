const path = require('path');

const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X'];


(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  await page.emulate(iPhone);

  await page.goto('https://google.com/');

  await page.waitForNavigation();

  await page.screenshot({
    path: path.join(__dirname, '..', '..', 'tmp', 'iphone_printscreen.png'),
    fullPage: true
  });

  console.log(await page.title())

  await browser.close();
})();