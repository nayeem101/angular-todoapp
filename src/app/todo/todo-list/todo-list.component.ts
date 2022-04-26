import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoItems!: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((items) => {
      this.todoItems = items;
    });
  }
}

/* 
todo : 1) search todo functionality
todo : 2) change list to table
todo : 3) make the ui better
todo : 4) correct the action menu button ui 
*/
