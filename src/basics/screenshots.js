const puppeteer = require('puppeteer');
const getFilePath = require('../utils/file');

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.nytimes.com/');
  page.waitForSelector('img');
  await page.screenshot({ path: getFilePath('nytimes-1.png'), fullPage: true })
  await browser.close()
})()