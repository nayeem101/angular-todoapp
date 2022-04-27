import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/interfaces/todo';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  todoForm = this.fb.group({
    title: [''],
    priority: [''],
    dateTime: [''],
  });

  editingMode = false;
  dataToEdit: Todo | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: Todo,
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.dialogData) {
      // console.log(this.dialogData);
      this.editingMode = true;
      this.dataToEdit = this.dialogData;
      this.todoForm.setValue({
        title: this.dialogData.title,
        priority: this.dialogData.priority,
        dateTime: this.dialogData.dateTime,
      });
    }
  }

  async onClick() {
    if (this.dataToEdit) {
      //updated Todo
      const updatedTodo: Todo = {
        id: this.dataToEdit.id,
        title: this.todoForm.get('title')?.value,
        priority: this.todoForm.get('priority')?.value,
        dateTime: this.todoForm.get('dateTime')?.value,
        createdAt: this.dataToEdit.createdAt,
        updatedAt: new Date(),
      };

      this.todoService.updateTodo(updatedTodo).subscribe((msg) => {
        this.openSnackBar(msg, 'Done');
        this.todoService.confirmTodoCreated(true);
      });
    } else {
      //create Todo
      const newTodo: Todo = {
        id: '',
        title: this.todoForm.get('title')?.value,
        priority: this.todoForm.get('priority')?.value,
        dateTime: this.todoForm.get('dateTime')?.value,
        createdAt: new Date(),
      };

      (await this.todoService.createTodo(newTodo)).subscribe((item) => {
        // console.log(item);
        this.todoService.confirmTodoCreated(true);
        this.openSnackBar(`Todo Created`, 'Done');
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
