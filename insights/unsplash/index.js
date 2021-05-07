require('dotenv/config');

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://unsplash.com/');
  // await page.screenshot({ path: path.join(__dirname, '..', '..', 'tmp', 'print.png') });

  // acessa página de login
  await page.click('[href="/login"]');

  // preenche formulario
  await page.type('[type=email]', process.env.UNSPLASH_USERNAME);
  await page.type('[type=password]', process.env.UNSPLASH_PASSWORD);

  // clica para efetuar login
  await page.click('[type=submit]');

  await page.waitForNavigation();

  await page.goto('https://unsplash.com/photos/-Uxe8de8YXI/');
  await page.click('[title="Like photo"]');

  // await waitFor();

  // await page.type('[type=search]', 'pokemon');
  // await page.click('[type=submit]');


  await browser.close();
})();

async function waitFor() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('loading...');
      resolve();
    }, 2000);
  });
}