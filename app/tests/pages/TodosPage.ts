import { Page } from 'playwright/test';

export class TodosPage {
  readonly taskTitleInput = this.page.getByRole('textbox', { name: 'Wpisz tytuł zadania' });
  readonly taskDescriptionInput = this.page.getByRole('textbox', { name: 'Wpisz opis zadania' });
  readonly addTaskButton = this.page.getByRole('button', { name: 'Dodaj zadanie' });

  constructor(private page: Page) {
    this.page = page;
  }

  async addTodo(title: string, description: string) {
    await this.taskTitleInput.fill(title);
    await this.taskDescriptionInput.fill(description);
    await this.addTaskButton.click();
  }

  async removeTodo(title: string) {
    const todoCard = this.page.locator('.card').filter({ hasText: title });
    const removeButton = todoCard.getByRole('button', { name: 'Usuń zadanie' });
    await removeButton.click();
  }

  async getTodoCount() {
    const todos = this.page.locator('.card');
    return await todos.count();
  }
}
