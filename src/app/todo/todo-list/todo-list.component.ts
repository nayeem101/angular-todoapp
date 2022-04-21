import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/interfaces/item';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todoItems!: Item[];

  @Output() editItem = new EventEmitter<Item>();

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((items) => {
      this.todoItems = items;
    });
  }

  onChecked(event: MatCheckboxChange, todo: Item) {
    const updatedTodo: Item = {
      ...todo,
      isDone: event.checked,
      updatedAt: new Date(),
    };

    this.todoService.updateTodo(updatedTodo).subscribe((msg) => {
      this.openSnackBar(msg, 'Done');
    });
  }

  onEdit(todo: Item) {
    this.editItem.emit(todo);
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.todoService.deleteTodo(id).subscribe((val) => {
        console.log(val);
        this.openSnackBar(`Todo with ${val} deleted`, 'Okay');
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500,
    });
  }
}
