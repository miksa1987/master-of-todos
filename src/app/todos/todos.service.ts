import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos: Observable<any[]>;
  returnedTodos;
  user;

  todoStates = [ 'active', 'done' ];

  constructor(public firestore: AngularFirestore, public userService: UserService) {
    if (userService.currentUser === null) {
      return;
    }

    this.setUser({
      uid: userService.currentUser.uid,
      email: userService.currentUser.email
    });
  }

  setUser(user) {
    this.user = user;
  }

  getTodos() {
    this.todos = this.firestore.collection(this.user.uid).snapshotChanges();
    return this.todos;
  }

  emptyTodos() {
    this.todos = new Observable<any[]>();
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

