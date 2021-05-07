
const puppeteer = require('puppeteer');

const getFilePath = require('../utils/file');

const viewPort = { width: 1280, height: 800 }
const options = {
  path: getFilePath('clipped_stocktickers.png'),
  fullPage: false,
  clip: {
    x: 0,
    y: 240,
    width: 1000,
    height: 100
  }
};

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport(viewPort)
  await page.goto('https://finance.yahoo.com/')
  await page.screenshot(options)
  await browser.close()
})()