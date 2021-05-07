const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

const getFilePath = require('../utils/file');

const product = readlineSync
  .question('Informe o produto que voce quer pesquisar: ') || "hd ssd 512gb";
const normalizedProductName = product.replace(' ', '_');

const firstPageScreenshot = getFilePath(`first_page_${normalizedProductName}_aws.png`);
const secondsPageScreenshot = getFilePath(`second_page_${normalizedProductName}_aws.png`);

const searchBar = '#twotabsearchtextbox';
const searchBotton = '#nav-search-submit-button';
const nextPageButton = '.a-last';
const resultsElement = '.s-result-list img';

const viewport = { width: 1920, height: 1280 };

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport(viewport);
  // abrir pagina
  await page.goto('https://www.amazon.com.br');
  //digitar produto
  await page.waitForSelector(searchBar);
  await page.type(searchBar, product, { delay: 100 });
  //clicar para pesquisar produto
  await page.click(searchBotton);
  // tirar print da primeira pagina
  await page.waitForNavigation();
  await page.screenshot({ path: firstPageScreenshot });
  //ir para proxima pagina
  await page.click(nextPageButton);
  await page.waitForSelector(resultsElement);
  //tirar print da proxima pagina
  await page.screenshot({ path: secondsPageScreenshot });

  await browser.close();
})();