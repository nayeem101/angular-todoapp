import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Todo } from 'src/app/interfaces/todo';
import { CustomDialogService } from 'src/app/shared/custom-dialog.service';
import { TodoCreateComponent } from '../todo-create/todo-create.component';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css'],
})
export class TodoTableComponent implements OnInit, OnChanges {
  @Input() filterValue!: string;

  @ViewChild(MatTable) table!: MatTable<Todo>;

  displayedColumns: string[] = ['title', 'priority', 'expiresIn', 'actions'];

  todoDataSource = new MatTableDataSource<Todo>();

  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private confirmDialog: CustomDialogService
  ) {
    this.todoService.todoCreated$.subscribe((confirmed) => {
      // console.log(confirmed);
      if (confirmed) {
        this.table.renderRows();
      }
    });
  }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todoDataSource.data = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['filterValue']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    this.todoDataSource.filter = this.filterValue.trim().toLowerCase();
  }

  onDelete(id: string) {
    const msg = 'Are sure you want to delete?';
    const dialogRef = this.confirmDialog.openConfirmDialog(msg);

    dialogRef.afterClosed().subscribe((confirmed) => {
      // console.log(confirmed);
      if (confirmed) {
        this.todoDataSource.filter = '';
        this.todoService.deleteTodo(id).subscribe((val) => {
          // console.log(val);
          this.todoService.confirmtodoDeleted(true);
          this.table.renderRows();
          this.openSnackBar(`Todo with ${val} deleted`, 'Okay');
        });
      }
    });
  }

  openDialog(todo: Todo) {
    // if (!this.isExpired) {
    this.dialog.open(TodoCreateComponent, {
      data: todo,
    });
    // }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500,
    });
  }

  isExpired(todo: Todo): boolean {
    const date = new Date();
    const todoDate = new Date(todo.dateTime);
    if (date >= todoDate) return true;
    return false;
  }
}
