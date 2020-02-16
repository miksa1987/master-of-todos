import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { TodosService } from '../todos.service';
import { UserService } from '../../user.service';

const mockTodosService = {
  emptyTodos: () => {}
};

const mockUserService = {
  signOut: () => {},
  currentUser: {
    email: 'x@x.com'
  }
};

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      providers: [
        { provide: TodosService, useValue: mockTodosService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays user email correctly', () => {
    const emailHeader = fixture.nativeElement.querySelector('.email-header');
    expect(emailHeader.textContent).toBe('x@x.com');
  });

  it('calls right functions when clicking log out', () => {
    spyOn(mockUserService, 'signOut');
    spyOn(mockTodosService, 'emptyTodos');

    const logoutButton = fixture.nativeElement.querySelector('.logout-button');
    logoutButton.click();

    expect(mockTodosService.emptyTodos).toHaveBeenCalledTimes(1);
    expect(mockUserService.signOut).toHaveBeenCalledTimes(1);
  });
});
