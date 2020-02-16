import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodosComponent, TopBarComponent, AddFormComponent, TodoComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodosModule { }
