import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid/async';
import { from, map, Observable, of, Subject } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {
    const todos = localStorage.getItem('ngtodos');
    if (todos) this.todos = JSON.parse(todos);
  }

  private getItem(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }
  private getIndex(id: string) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  private updateLocalStorage() {
    localStorage.setItem('ngtodos', JSON.stringify(this.todos));
  }

  //emit confirmed after todo created or updated
  private todoCreatedSource = new Subject<boolean>();
  todoCreated$ = this.todoCreatedSource.asObservable();
  confirmTodoCreated(confirmed: boolean) {
    this.todoCreatedSource.next(confirmed);
  }

  //emit confirmed after todo deleted
  private todoDeletedSource = new Subject<boolean>();
  todoDeleted$ = this.todoDeletedSource.asObservable();
  confirmtodoDeleted(confirmed: boolean) {
    this.todoDeletedSource.next(confirmed);
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  getTodo(id: string): Observable<Todo | null> {
    const item = this.getItem(id);
    if (item) return of(item);
    else return of(null);
  }

  async createTodo(todo: Todo): Promise<Observable<Todo>> {
    const newTodo = {
      ...todo,
      id: await nanoid(4),
    };
    this.todos.push(newTodo);
    this.updateLocalStorage();
    return of(newTodo);
  }

  updateTodo(todo: Todo): Observable<string> {
    const index = this.getIndex(todo.id);
    this.todos.splice(index, 1, todo);
    this.updateLocalStorage();
    return of('Todo updated');
  }

  deleteTodo(id: string): Observable<string> {
    const index = this.getIndex(id);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.updateLocalStorage();
    return of(id);
  }
}
