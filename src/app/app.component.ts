import { Component } from '@angular/core';
import { Item } from './interfaces/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Create Todo';
  editItem!: Item;

  onEditItem(todo: Item) {
    // console.log(todo);
    this.editItem = todo;
    this.title = 'Update Todo';
  }

  isEditing(val: boolean) {
    if (val) this.title = 'Update Todo';
    else this.title = 'Create Todo';
  }
}
