const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.tracing.start({
    path: path.join(__dirname, '..', '..', 'tmp', 'trace.json'),
    categories: ['devtools.timeline']
  });

  await page.goto('https://news.ycombinator.com/news');

  const stories = await page.evaluate(() => {
    const anchors = [...document.querySelectorAll('a.storylink')];
    const stories = anchors.map(anchor => anchor.textContent).slice(0, 10);
    return stories;
  });
  console.log(stories);

  await page.tracing.stop();

  await browser.close();
})();