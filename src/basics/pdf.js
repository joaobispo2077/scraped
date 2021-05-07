const puppeteer = require('puppeteer');
const getFilePath = require('../utils/file');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Create PDF from URL - not working when headless false is active
  await page.goto('https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf');
  await page.pdf({ path: getFilePath('api.pdf'), format: 'A4' });


  // Create PDF from static HTML
  const htmlContent = `<body>
  <h1>An example static HTML to PDF</h1>
  </body>`;
  await page.setContent(htmlContent);
  await page.pdf({ path: getFilePath('html.pdf'), format: 'A4' });


  await browser.close();
})();