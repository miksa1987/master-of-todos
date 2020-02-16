import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormComponent } from './add-form.component';
import { UserService } from '../../user.service';
import { TodosService } from '../todos.service';
import { newEvent } from '../../testhelper';

const mockUserService = {
  currentUser: {
    uid: '123'
  }
};

const mockTodosService = {
  addTodo: (todo) => {}
};

describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormComponent ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: TodosService, useValue: mockTodosService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls right function when add button is clicked', () => {
    spyOn(mockTodosService, 'addTodo');

    const addTodoInput = fixture.nativeElement.querySelector('.add-todo-input');
    const addTodoButton = fixture.nativeElement.querySelector('.add-todo-button');

    addTodoInput.value = 'test';
    addTodoInput.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    addTodoButton.click();

    expect(mockTodosService.addTodo).toHaveBeenCalledWith({
      title: 'test',
      additional: '', // TBD this feature
      important: false, // TBD
      state: 'active',
      userId: '123',
      dateDue: new Date()
    });
  });
});
