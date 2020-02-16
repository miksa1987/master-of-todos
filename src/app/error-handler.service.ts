import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor() {}

  handleError(error) {
    // your custom error handling logic    
  }
}