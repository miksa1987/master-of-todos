import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TodoComponent } from './todo/todo.component';
import { UserService } from '../user.service';
import { TodosService } from './todos.service';

@NgModule({
  declarations: [TodosComponent, TopBarComponent, AddFormComponent, TodoComponent],
  imports: [
    CommonModule
  ],
  providers: [
    TodosService,
    UserService
  ]
})
export class TodosModule { }
