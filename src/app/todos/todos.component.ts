import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

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
    if (!todosService.getUser()) {
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

        this.todos = handledValues.sort((a, b) => b.date - a.date);
        this.shownTodos = handledValues.sort((a, b) => b.date - a.date);
      },
      error: () => {},
      complete: () => {} // Without these two empty functions, apparently the subscription never ends.
    };

    const subscriber = this.todosService.getTodos().subscribe(observer);
    this.todosService.setUnsubscribe(subscriber.remove);
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
