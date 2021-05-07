const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.goto('https://news.ycombinator.com/news');

  const name = await page.evaluate(() => document
    .querySelector('.hnname > a').innerText);

  console.log(name);

  await browser.close();
})();