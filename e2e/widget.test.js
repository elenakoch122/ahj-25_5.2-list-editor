import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(200000);

describe('Widget', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
    server.kill();
  });

  test('should render the product on the page', async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForSelector('.widget');

    const addButton = await page.$('.btn-add');
    await addButton.click();

    await page.waitForSelector('.popup');

    const inputName = await page.$('#input-name');
    const inputPrice = await page.$('#input-price');

    await inputName.type('phone');
    await inputPrice.type('15000');

    const saveButton = await page.$('.btn-popup-save');
    await saveButton.click();

    await page.waitForSelector('.product');
  });

  test('should remove the product from the page', async () => {
    const deleteButton = await page.$('.delete');
    await deleteButton.click();

    await page.waitForSelector('.product', { hidden: true });
  });
});
