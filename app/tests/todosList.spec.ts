import { test, expect } from '@playwright/test';
import { TodosPage } from './pages/TodosPage';

const BASE_URL = 'http://localhost:5173/';

test.beforeAll(() => {

})

test.describe('Todos List Tests', () => {
  test.beforeEach(async ({ page }) => {});

  test('has title', async ({ page }) => {});
})

test('menu item Services should be first on the left of menu item Contact', async ({ page }) => {
   await page.goto(BASE_URL);
    const firstHeaderElement = page.locator('.navbar-item:left-of(:text("Contact"))').first();

    await expect(firstHeaderElement).toHaveText(/Services/);

});

test('footer should contain title MyCleaningaApp', async ({ page }) => {
    await page.goto(BASE_URL);

    const footerText = page.locator('footer:has-text("MyCleaning App")');

    

    await page.screenshot({ path: 'error.png', fullPage: true });
    await expect(footerText).toBeVisible();
});

test('has proper amount of tasks to do when app run first time', async ({ page }) => {
    await page.goto(BASE_URL);

    // const tasksCount = await page.locator('.card').count();

    // expect(tasksCount).toBe(6);

    const todos = await page.locator('.card');
    await expect(todos).toHaveCount(6);
});

test('add new task', async ({ page }) => {
  const todosPage = new TodosPage(page);
  await page.goto(BASE_URL);

  await expect(page).toHaveScreenshot('default-todospage.png', { fullPage: true });

  const amountOfTasks = await todosPage.getTodoCount();
  await expect(amountOfTasks).toBe(6);
  await todosPage.addTodo('Testowe zadanie', 'Opis do zadania');

  await expect(page).toHaveScreenshot('todospage-after-added-new-task.png', { fullPage: true });

  await page.evaluate(() => {
    const a = localStorage.getItem('token');
    console.log('Token from localStorage:', a);
  })
 
  const amountOfTasksAfterAddedNewOne = await todosPage.getTodoCount();
  await expect(amountOfTasksAfterAddedNewOne).toBe(3);
})


test('remove task', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});

test.describe.parallel('Todos List Tests', () => {

  const todos = [
    { task: 'Testowe zadanie 1', description: 'Opis do zadania 1' },
    { task: 'Testowe zadanie 2', description: 'Opis do zadania 2' },
    { task: 'Testowe zadanie 3', description: 'Opis do zadania 3' }
  ];

  todos.forEach(({ task, description }) => {
    test(`add and remove task: ${task}`, async ({ page }) => {
      test.skip(task === 'Testowe zadanie 2', 'Skipping this task for demonstration purposes');
    })
  });

})
