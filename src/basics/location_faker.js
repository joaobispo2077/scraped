const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });

  const screenshotPath = path.join(__dirname, '..', '..', 'tmp', 'location.png');
  const url = 'https://developers.google.com/maps/documentation/javascript/examples/map-geolocation';

  const context = browser.defaultBrowserContext();
  await context.overridePermissions(url, ['geolocation']);

  const page = await browser.newPage();

  await page.evaluateOnNewDocument(function () {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        cb({
          coords: {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 0.62896,
            longitude: 77.3111303,
            speed: null
          }
        })
      }, 1000)
    }
  });


  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: screenshotPath });

  await browser.close();
})();