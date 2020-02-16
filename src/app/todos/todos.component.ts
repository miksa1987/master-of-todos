import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoItem } from './todo-item.interface';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  todos: TodoItem[];
  shownTodos: TodoItem[];

  filters = [ ...this.todosService.todoStates, 'all' ];
  currentFilter = 'all';

  constructor(public todosService: TodosService, public router: Router) {

    // I could use route guards, BUT, they, or their redirects gave me nothing but trouble.
    if (!todosService.user) {
      this.router.navigateByUrl('/');
    }

    this.init();
  }

  init() {
    const observer = {
      next: (values) => {
        const handledValues = [];

        values.forEach((value) => {
          const handledValue = {
            ...value.payload.doc.data(),
            id: value.payload.doc.id
          };

          handledValues.push(handledValue);
        });

        this.todos = handledValues;
        this.shownTodos = handledValues;
      }
    };
    this.todosService.getTodos().subscribe(observer);
  }

  setFilter(filter) {
    this.checkThatFilterExists(filter);
    if (filter !== 'all') {
      this.shownTodos = this.todos.filter((todo) => todo.state === filter);
      this.currentFilter = filter;
    } else {
      this.shownTodos = this.todos;
      this.currentFilter = filter;
    }
  }

  checkThatFilterExists(filter) {
    if (!this.filters.includes(filter)) {
      throw new Error('Not a known filter');
    }
  }
}
