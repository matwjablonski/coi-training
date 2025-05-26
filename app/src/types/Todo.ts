export type Todo = {
  id: number;
  task: string;
  done: boolean;
  priority: number;
  created_at: string; 
  due_date?: string;
  description?: string;
}

export type Todos = Todo[];
