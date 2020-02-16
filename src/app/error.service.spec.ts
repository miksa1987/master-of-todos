import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './error.service';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: GlobalErrorHandler, useValue: GlobalErrorHandler }
      ]
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
