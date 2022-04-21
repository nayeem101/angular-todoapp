import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Item[] = [];

  constructor() {
    const todos = localStorage.getItem('todos');
    if (todos) this.todos = JSON.parse(todos);
  }

  private getItem(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }
  private getIndex(id: number) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  private updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodos(): Observable<Item[]> {
    return of(this.todos);
  }

  getTodo(id: number): Observable<Item | null> {
    const item = this.getItem(id);
    if (item) return of(item);
    else return of(null);
  }

  createTodo(todo: Item): Observable<Item> {
    const newTodo = {
      ...todo,
      id: this.todos.length + 1,
    };
    this.todos.push(newTodo);
    this.updateLocalStorage();
    return of(newTodo);
  }

  updateTodo(todo: Item): Observable<string> {
    const index = this.getIndex(Number(todo.id));
    this.todos.splice(index, 1, todo);
    this.updateLocalStorage();
    return of('Todo updated');
  }

  deleteTodo(id: number): Observable<number> {
    const index = this.getIndex(id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.updateLocalStorage();
    return of(id);
  }
}
