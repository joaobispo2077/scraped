const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/nerdstore/');

  await page.screenshot({ path: path.join(__dirname, 'tmp', 'nerdstore.png') });
  const images = await page.evaluate(() => {
    // selecionar postagens
    const nodeList = document.querySelectorAll('article img');
    // transformar node list em array
    const posts = [...nodeList];

    // transformar os elementos html em objetos json
    const images = posts.map(post => ({
      src: post.src
    }));

    // retornar
    console.log(images);
    return images;
  });

  fs.writeFile('tmp/nerdstore.json', JSON.stringify(images, null, 2), err => {
    if (err) throw new Error('Something went wrong');

    console.log('well done!');
  });

  await browser.close();
})();