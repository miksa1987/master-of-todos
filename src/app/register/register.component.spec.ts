import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { newEvent } from '../testhelper';

const mockRouter = {
  navigateByUrl: (route) => {}
};

const mockUserService = {
  createUser: (email, password) => {}
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call right functions when creating user', () => {
    spyOn(mockUserService, 'createUser');

    const emailInput = fixture.nativeElement.querySelector('.email-input');
    const passwordInput = fixture.nativeElement.querySelector('.password-input');
    const repeatPasswordInput = fixture.nativeElement.querySelector('.repeat-password-input');
    const registerButton = fixture.nativeElement.querySelector('.register-button');

    emailInput.value = 'x@x.com';
    passwordInput.value = '123456';
    repeatPasswordInput.value = '123456';
    emailInput.dispatchEvent(newEvent('input'));
    passwordInput.dispatchEvent(newEvent('input'));
    repeatPasswordInput.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    registerButton.click();

    expect(mockUserService.createUser).toHaveBeenCalledWith('x@x.com', '123456');
  });

  it('calls navigateByUrl when clicking cancel', () => {
    spyOn(mockRouter, 'navigateByUrl');

    const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
    cancelButton.click();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
