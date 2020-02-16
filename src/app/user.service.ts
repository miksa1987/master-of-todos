import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser;

  constructor(
    public auth: AngularFireAuth, 
    public router: Router,
    private notifications: NotificationsService
  ) {
    const user = JSON.parse(window.localStorage.getItem('master-of-todos-user-id'));
    this.currentUser = user;
  }

  initUser(setUserToTodos) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        window.localStorage.setItem('master-of-todos-user-id', JSON.stringify({ uid: user.uid, email: user.email }));
        this.setUser(user);
        setUserToTodos({ email: user.email, uid: user.uid });
        this.router.navigateByUrl('/todos');
        this.notifications.success('Logged in.');
      } else {
        window.localStorage.clear();
      }
    });
  }

  createUser(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  setUser(user) {
    this.currentUser = user;
  }

  loginUser(email, password) {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.auth.signOut();
    this.router.navigateByUrl('/');
  }
}
