const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 1800 })
  await page.goto('https://getbootstrap.com/docs/4.3/components/forms/#checkboxes-and-radios');

  const checkBoxStatus = await page.evaluate(() =>
    document
      .querySelector('#defaultCheck1').checked
  );
  console.log('checkBoxStatus:', checkBoxStatus);

  const radios = await page.evaluate(() =>
    [...document
      .querySelectorAll('input[name="exampleRadios"]')]
      .map(input => input.value)
  );
  console.log('radios :', radios);

  const selectOptions = await page.evaluate(() => {
    const selectNodeList = document
      .querySelectorAll('.bd-example > select.custom-select.custom-select-lg.mb-3 > option');

    const selectOptionsList = [...selectNodeList];

    return selectOptionsList.map(option => option.value);
  });
  console.log('selectOptions :', selectOptions);

  await browser.close();
})();