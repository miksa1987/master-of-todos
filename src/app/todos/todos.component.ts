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

  filters = [ ...this.todosService.getTodoStates(), 'all' ];
  currentFilter = 'all';

  constructor(public todosService: TodosService, public router: Router) { 
    // I could use route guards, BUT, they, or their redirects gave me nothing but trouble on this.
    this.checkIfUserIsAuthorized();
    this.checkIfBrowserWasRefreshed();

    this.initTodos();
  }

  initTodos() {
    const observer = {
      next: (values) => {
        const handledValues = this.todosService.getObserverValueHandler()(values);

        this.todos = this.sortTodos(handledValues);
        this.shownTodos = this.sortTodos(handledValues);
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

  sortTodos(todoList) {
    return todoList
      .sort((a, b) => b.date.seconds - a.date.seconds)
      .sort((a, b) => b.important - a.important);
  }

  checkIfBrowserWasRefreshed() {
    const subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.router.navigated) {
          this.router.navigateByUrl('/');
        }
      }
    });
    subscription.unsubscribe();
  }

  checkIfUserIsAuthorized() {
    if (!this.todosService.getUser()) {
      this.router.navigateByUrl('/');
    }
  }
}
