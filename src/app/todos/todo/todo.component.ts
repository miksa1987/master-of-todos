import { Component, Input, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { TodoItem } from '../todo-item.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoItem;

  title = '';
  id = '';
  state = '';

  constructor(public todoService: TodosService) { }

  async ngOnInit() {
    this.title = await this.todo.title;
    this.id = await this.todo.id;
    this.state = await this.todo.state;
  }

  remove() {
    this.todoService.removeTodo(this.id);
  }

  toggle() {
    this.todoService.toggleState(this.id, this.state);
  }
}
