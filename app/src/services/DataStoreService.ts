import { Service } from '../lib/Service';
import { Todos } from '../types/Todo';

type Store = {
  todos: Todos;
}

interface DataStoreServiceInterface {
  subscribe<T>(key: string, callback: (value: T) => void): void;
  set<T>(key: string, value: T): void;
  add<K extends keyof Store>(key: K, value: Store[K] extends (infer U)[] ? U : never): void;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
  remove(key: string): void;
  removeByValue(key: string, property: string, value: any): void;
  clear(): void;
}

export class DataStoreService extends Service implements DataStoreServiceInterface {
  private store: Partial<Store> = {};
  private subscribers: Record<string, Function[]>;

  constructor(services, store = {}) {
    super(services);
    this.store = store;
    this.subscribers = {};
  }

  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
  }

  notify(key) {
    const callbacks = this.subscribers[key] || [];

    callbacks.forEach(cb => cb(this.store[key]));
  }

  set<T>(key: string, value: T): void {
    this.store[key] = value;
    this.notify(key);
  }

  add<K extends keyof Store>(key: K, value: Store[K] extends (infer U)[] ? U : never): void {
    if (!this.store[key]) {
      this.store[key] = [] as Store[K];
    }
    (this.store[key] as Array<typeof value>).push(value);
    this.notify(key);
  }

  get<T>(key: string): T | undefined {
    return this.store[key];
  }

  has(key: string): boolean {
    return key in this.store;
  }

  remove(key: string): void {
    delete this.store[key];
    this.notify(key);
  }

  removeByValue<T, P extends keyof T>(key: string, property: P, value: T[P]): void {
    if (this.store[key]) {
      this.store[key] = this.store[key].filter(item => item[property] !== value);
      this.notify(key);
    }
  }

  clear(): void {
    this.store = {};
    Object.keys(this.subscribers).forEach(key => this.notify(key));
  }
}
