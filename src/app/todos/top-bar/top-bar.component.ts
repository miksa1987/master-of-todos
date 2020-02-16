import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { TodosService } from '../todos.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  userEmail = '';

  constructor(public userService: UserService, public todosService: TodosService) { }

  ngOnInit(): void {
    this.userEmail = this.userService.currentUser.email;
  }

  signOut() {
    this.todosService.emptyTodos();
    this.userService.signOut();
  }
}
