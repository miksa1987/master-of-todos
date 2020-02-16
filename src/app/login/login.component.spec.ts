import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { newEvent } from '../testhelper';

const mockRouter = {
  navigateByUrl: (route) => {}
};

const mockUserService = {
  loginUser: (email, password) => {}
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call right functions when logging in', () => {
    spyOn(mockUserService, 'loginUser');

    const emailInput = fixture.nativeElement.querySelector('.email-input');
    const passwordInput = fixture.nativeElement.querySelector('.password-input');
    const loginButton = fixture.nativeElement.querySelector('.login-button');

    emailInput.value = 'x@x.com';
    passwordInput.value = '123456';
    emailInput.dispatchEvent(newEvent('input'));
    passwordInput.dispatchEvent(newEvent('input'));

    fixture.detectChanges();
    loginButton.click();

    expect(mockUserService.loginUser).toHaveBeenCalledWith('x@x.com', '123456');
  });

  it('calls navigateByUrl when clicking cancel', () => {
    spyOn(mockRouter, 'navigateByUrl');

    const cancelButton = fixture.nativeElement.querySelector('.cancel-button');
    cancelButton.click();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
