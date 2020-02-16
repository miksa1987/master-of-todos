import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { UserService } from '../user.service';

const mockUser = { uid: '1', email: 'x@x.com' };

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: {}},
        { provide: UserService, useValue: {}}
      ]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
