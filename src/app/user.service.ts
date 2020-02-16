
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
  ) { }

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

  async userExists(email) {
    const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
    
    if (signInMethods.length > 0) {
      return true;
    }

    return false;
  }

  async createUser(email, password) {
    // createUserWithEmailAndPassword will check this, BUT it also throws "email already in use"
    // error even when email is not registered, so that's why this hack.
    if (await this.userExists(email)) {
      throw new Error('User already exists.');
    }
    
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  setUser(user) {
    this.currentUser = user;
  }

  async loginUser(email, password) {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.router.navigateByUrl('/');
    this.auth.signOut();
  }
}
