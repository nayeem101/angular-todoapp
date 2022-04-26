import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.component';
import { CustomDialogService } from 'src/app/shared/custom-dialog.service';
import { TodoCreateComponent } from '../todo-create/todo-create.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css'],
})
export class TodoHomeComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(private dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todoDeleted$.subscribe((dltConfirmed) => {
      if (dltConfirmed) {
        this.searchControl.setValue('');
      }
    });
  }

  openDialog() {
    this.dialog.open(TodoCreateComponent);
  }

  clearInput() {
    this.searchControl.setValue('');
  }
}
