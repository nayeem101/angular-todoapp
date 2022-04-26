import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/interfaces/todo';
import { TodoCreateComponent } from '../todo-create/todo-create.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input() todo!: Todo;
  isExpired!: boolean;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.todo) {
      const date = new Date();
      const todoDate = new Date(this.todo.dateTime);
      if (date >= todoDate) this.isExpired = true;
      else this.isExpired = false;

      // console.log(`${date} and ${todoDate} ${this.isExpired}`);
    }
  }

  openDialog(todo: Todo) {
    if (!this.isExpired) {
      this.dialog.open(TodoCreateComponent, {
        data: todo,
      });
    }
  }

  onDelete(id: string | undefined) {
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
