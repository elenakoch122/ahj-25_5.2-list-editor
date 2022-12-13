import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(200000);

describe('Popup', () => {
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

  test('popup should show on the page', async () => {
    await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    await page.waitForSelector('.widget');

    const addButton = await page.$('.btn-add');
    await addButton.click();

    await page.waitForSelector('.popup');
  });

  test('popup should hide on the page', async () => {
    const cancelButton = await page.$('.btn-popup-close');
    await cancelButton.click();

    await page.waitForSelector('.popup', { hidden: true });
  });
});
