import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:5173/');

  await page.evaluate(() => {
    localStorage.setItem('token', 'demo-auth-token');
  });

  await context.storageState({ path: 'tests/.auth/token.json' });

  await browser.close();
})();
