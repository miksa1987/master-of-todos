import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(private notifications: NotificationsService) {}

  handleError(error) {
    console.log(error.message);
    let message = error.message;

    if (error.message.includes('email address is badly formatted')) 
      message = 'Invalid e-mail address.';
    else if (error.message.includes('should be at least 6 characters'))
      message = 'Password should be at least 6 characters long.';
    else if (error.message.includes('password is invalid or'))
      message = 'Invalid e-mail address or password.';

    this.notifications.error(message);   
  }
}