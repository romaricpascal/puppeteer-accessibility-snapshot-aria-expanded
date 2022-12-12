const puppeteer = require('puppeteer');
const {join} = require('node:path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://'+join(__dirname, 'index.html'));
  
  const button = await page.$('button');

  console.log(await getAccessibleName(page, button));

  await button.click();
  // Without this selector (or an `await page.waitForTimeout()`), 
  // the call to `page.accessibility.snapshot` inside `getAccessibleName` throws
  // await page.waitForSelector('aria/Hide');
  console.log(await getAccessibleName(page, button));

  await browser.close();
})();

async function getAccessibleName(page, element) {
  return (await page.accessibility.snapshot({ root: element })).name
}
