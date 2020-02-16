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
  important = false;

  constructor(public todoService: TodosService) { }

  async ngOnInit() {
    this.title = await this.todo.title;
    this.id = await this.todo.id;
    this.state = await this.todo.state;
    this.important = await this.todo.important;
  }

  remove() {
    this.todoService.removeTodo(this.id);
  }

  toggleState() {
    this.todoService.toggleState(this.id, this.state);
  }

  toggleImportance() {
    this.todoService.toggleImportance(this.id, this.important);
  }
}
