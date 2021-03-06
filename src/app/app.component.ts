import { Component } from '@angular/core';

import { UserService } from './user.service';
import { TodosService } from './todos/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription;

  constructor(
    public userService: UserService,
    public todosService: TodosService
  ) { }

  ngOnInit(): void {
    // We need to pass todoService setUser function here to avoid cyclic dependency.
    // And use bind to not lose this in todosService.
    this.userService.initUser(this.todosService.setUser.bind(this.todosService));
  }
}
