import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { TodosService } from '../todos.service';
import { TodoItem } from '../todo-item.interface';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  title = '';

  constructor(public todosService: TodosService, public userService: UserService) { }

  updateTitle(value) {
    this.title = value;
  }

  async addTodo(event) {
    event.preventDefault();

    const todoToAdd: TodoItem = {
      title: this.title,
      additional: '', // TBD this feature
      important: false, // TBD
      state: 'active',
      userId: this.userService.currentUser.uid,
      dateDue: new Date() // TBD put custom date
    };

    this.todosService.addTodo(todoToAdd);
    this.title = '';
  }
}
