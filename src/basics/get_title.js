const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.goto('https://savelivez.com/');

  const pagetitle = await page.title();

  console.log(pagetitle);

  await browser.close();
})();