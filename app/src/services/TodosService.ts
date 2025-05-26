import { Service } from '../lib/Service';
import { Todo, Todos } from '../types/Todo';
import { DataStoreService } from './DataStoreService';

export class TodosService extends Service {
  private DataStoreService!: DataStoreService;

  constructor(services: Record<string, unknown>) {
    super(services);
  }

  async removeTodoById(todoId: number) {
    this.DataStoreService.removeByValue<Todo, 'id'>('todos', 'id', todoId);
  }

  async addTodo(todo: Todo) {
    const todos = this.DataStoreService.get<Todos>('todos');
    if (!todos) {
      throw new Error('Todos not found in DataStoreService');
    }
    todo.id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    todo.done = false;

    this.DataStoreService.add('todos', todo);
  }

  async markTodoAsDone(todoId: number) {
    const todos = this.DataStoreService.get<Todos>('todos');

    if (!todos) {
      throw new Error('Todos not found in DataStoreService');
    }
    const todo = todos.find(t => t.id === todoId);
   
    if (todo) {
      todo.done = true;
      this.DataStoreService.set('todos', todos);
    }
  }

  async fetchTodos() {
    try {
      const response = await fetch('/data.json')
      const { data }: { data: Todos } = await response.json();
      
      const sortByTask = (a, b) => {
        if ( a.task < b.task ) {
          return -1;
        }
        if ( a.task > b.task ) {
          return 1;
        }
        return 0;
      }

      data.sort(sortByTask);

      this.DataStoreService.set('todos', data);
    } catch (error) {
      console.error('Error initializing TodosService:', error);
    }
  }
}
