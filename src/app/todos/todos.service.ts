import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private unsubscribe = null;
  private user;

  private todoStates = [ 'active', 'done' ];

  constructor(
    private firestore: AngularFirestore,
    private spinner: NgxSpinnerService
  ) { }

  setUser(user) {
    this.user = user;
  }

  setUnsubscribe(unsubscribeFunction) {
    this.unsubscribe = unsubscribeFunction;
  }

  getUser() {
    return this.user;
  }

  getTodoStates() {
    return this.todoStates;
  }

  getTodos() {
    this.spinner.show();
    return this.firestore.collection(this.user.uid).snapshotChanges();
  }

  getObserverValueHandler() {
    return (values) => {
      const handledValues = [];

      values.forEach((value) => {
        const handledValue = {
          ...value.payload.doc.data(),
          id: value.payload.doc.id
        };

        handledValues.push(handledValue);
      });

      return handledValues;
    }
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

