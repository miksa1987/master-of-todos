import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private notifications: NotificationsService) {}

  async handleError(error) {
    let showMessage = true;
    let message = error.message;

    if (error.message.includes('email address is badly formatted')) {
      message = 'Invalid e-mail address.';
    }
    else if (error.message.includes('should be at least 6 characters')) {
      message = 'Password should be at least 6 characters long.';
    }
    else if (error.message.includes('password is invalid or')) {
      message = 'Invalid e-mail address or password.';
    }
    else if (error.message.includes('already exists')) {
      message = 'User already exists.';
    }
    // auth.createUserWithEmailAndPassword will check this, BUT it also throws "email already in use"
    // error even when email is not registered, so that's why this hack.
    else if (error.message.includes('already in use')) {
      showMessage = false;
    }
    

    if (showMessage)
      this.notifications.error(message);   
  }
}