import { test, expect } from '@playwright/test';

test('test', async ({ page, browser }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Wpisz tytuł zadania' }).click();
  await page.getByRole('textbox', { name: 'Wpisz tytuł zadania' }).fill('Testowe zadanie');
  await page.getByRole('textbox', { name: 'Wpisz opis zadania' }).click();
  await page.getByRole('textbox', { name: 'Wpisz opis zadania' }).fill('Opis do zadania');
  await page.getByRole('button', { name: 'Dodaj zadanie' }).click();
  await page.getByRole('heading', { name: 'Testowe zadanie' }).click();
  await page.getByText('Opis do zadania').click();
  await page.getByText('Opis do zadania').click();
});
