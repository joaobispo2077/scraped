const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto('https://trix-editor.org/');
  await page.focus('trix-editor');

  await page.keyboard.type('Just adding a title');
  await page.screenshot({ path: path.join(__dirname, '..', '..', 'tmp', 'keyboard.png') });
  await browser.close();
})();