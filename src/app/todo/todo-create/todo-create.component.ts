import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from 'src/app/interfaces/item';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit, OnChanges {
  @Input() toEdit!: Item;
  @Output() editing = new EventEmitter<boolean>();

  title = new FormControl();
  editingMode = false;

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    const todo = this.toEdit;
    if (todo) {
      this.title.setValue(todo.title);
      this.editingMode = true;
      this.editing.emit(this.editingMode);
    }
  }

  onClick() {
    if (this.editingMode) {
      const updatedTodo: Item = {
        ...this.toEdit,
        title: this.title.value,
        updatedAt: new Date(),
      };

      this.todoService.updateTodo(updatedTodo).subscribe((msg) => {
        this.openSnackBar(msg, 'Done');
        this.editingMode = false;
        this.editing.emit(this.editingMode);
      });
    } else {
      const newTodo: Item = {
        title: this.title.value,
        isDone: false,
        createdAt: new Date(),
      };

      this.todoService.createTodo(newTodo).subscribe((item) => {
        console.log(item);
        this.openSnackBar(`Todo Created`, 'Done');
      });
    }
    this.title.setValue('');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
