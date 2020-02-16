import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { TodosService } from '../todos.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const mockTodosService = {
    removeTodo: (todoId) => {},
    toggleState: (todoId) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      providers: [
        { provide: TodosService, useValue: mockTodosService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = {
      title: 'test',
      additional: 'test',
      important: true,
      date: new Date(),
      userId: '1',
      state: 'active'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggle calls right function', () => {
    spyOn(mockTodosService, 'toggleState');

    const toggleButton = fixture.nativeElement.querySelector('.toggle-todo-button');
    toggleButton.click();
    expect(mockTodosService.toggleState).toHaveBeenCalledTimes(1);
  });

  it('remove calls right function', () => {
    spyOn(mockTodosService, 'removeTodo');

    const removeButton = fixture.nativeElement.querySelector('.remove-todo-button');
    removeButton.click();
    expect(mockTodosService.removeTodo).toHaveBeenCalledTimes(1);
  });
});
