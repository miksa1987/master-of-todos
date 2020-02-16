import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private unsubscribe = null;
  private todos: Observable<any[]>;
  private user;

  todoStates = [ 'active', 'done' ];

  constructor(public firestore: AngularFirestore, public userService: UserService) { }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setUnsubscribe(unsubscribeFunction) {
    this.unsubscribe = unsubscribeFunction;
  }

  getTodos() {
    return this.firestore.collection(this.user.uid).snapshotChanges();
  }

  emptyTodos() {
    this.unsubscribe();
  }

  addTodo(todoData) {
    this.firestore.collection(this.user.uid).add(todoData);
  }

  removeTodo(todoId) {
    this.firestore.collection(this.user.uid).doc(todoId).delete();
  }

  toggleState(todoId, currentState) {
    this.firestore.collection(this.user.uid).doc(todoId).set({
      state: this.todoStates[this.getNewStateIndex(currentState)]
    }, { merge: true });
  }

  toggleImportance(todoId, currentImportance) {
    this.firestore.collection(this.user.uid).doc(todoId).set({
      important: !currentImportance
    }, { merge: true });
  }

  getNewStateIndex(currentState) {
    const currentStateIndex = this.todoStates.indexOf(currentState);
    let newIndex = currentStateIndex + 1;
    if (newIndex === this.todoStates.length) {
      newIndex = 0;
    }

    return newIndex;
  }
}

