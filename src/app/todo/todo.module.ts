import { NgModule } from '@angular/core';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { SharedModule } from '../shared/shared.module';
import { TodoHomeComponent } from './todo-home/todo-home.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoTableComponent } from './todo-table/todo-table.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoCreateComponent,
    TodoHomeComponent,
    TodoListItemComponent,
    TodoTableComponent,
  ],
  imports: [SharedModule, TodoRoutingModule],
  providers: [],
})
export class TodoModule {}
