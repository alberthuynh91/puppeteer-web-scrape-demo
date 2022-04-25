const puppeteer = require("puppeteer");
const { autoScroll, generateDataFile } = require("./utils");

const route = 'https://www.mercari.com/us/category/7/?page=1'

const scrapeFile = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 900,
    deviceScaleFactor: 1,
  });
  // websites will block requests from useragent of HeadlessChrome so we set custom user-agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4298.0 Safari/537.36');
  await page.goto(route);
  await autoScroll(page);
  const list = []
  const items = await page.evaluate(() => Array.from(document.querySelector("[data-testid='SearchResults']").querySelectorAll("[data-testid='ItemContainer']"), e => e.innerText));

  items.forEach(item => {
    const split = item.split("\n")
    list.push({
      name: split[0],
      brand: split[1],
      price: split[3],
    })
  });

  console.log(`what is list.length? : `, list.length)

  generateDataFile(items)
  await browser.close();
}

scrapeFile();




