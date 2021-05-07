const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const screenshotPath = path.join(__dirname, '..', '..', 'tmp', 'mouse_click.png');

  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.setViewport({ width: 800, height: 600 });


  await page.goto('http://unixpapa.com/js/testmouse.html');

  await page.mouse.click(132, 103, { button: 'left' });

  await page.screenshot({ path: screenshotPath });
  await browser.close();
})();