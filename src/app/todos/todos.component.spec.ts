import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { Router } from '@angular/router';
import { TodosService } from './todos.service';
import { Observable } from 'rxjs';

const mockTodosService = {
  todoStates: [ 'active', 'done' ],
  getTodos: () => new Observable<any[]>(),
  getUser: () => ({ uid: '', email: '' }),
  setUnsubscribe: () => {}
};

const mockRouter = {
  navigateByUrl: (url) => {},
  events: {
    subscribe: () => ({
      unsubscribe: () => {}
    })
  }
}

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('will change to a known filter', () => {
    component.todos = [
      {
        title: '',
        additional: '',
        important: true,
        date: new Date(),
        state: 'active',
        userId: '123'
      }
    ];
    component.setFilter('active');
    expect(component.currentFilter).toBe('active');
  });

  it('will not change to unknown filter', () => {
    expect(() => component.setFilter('monster')).toThrowError();
  });
});
