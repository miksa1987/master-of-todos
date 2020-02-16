import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from './splash.component';
import { Router } from '@angular/router';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  const mockRouter = {
    navigateByUrl: (route) => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls right function when clicking login', () => {
    spyOn(mockRouter, 'navigateByUrl');

    const loginButton = fixture.nativeElement.querySelector('.login-button');
    loginButton.click();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('calls right function when clicking register', () => {
    spyOn(mockRouter, 'navigateByUrl');

    const registerButton = fixture.nativeElement.querySelector('.register-button');
    registerButton.click();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/register');
  });
});
