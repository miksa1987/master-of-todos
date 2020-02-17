
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser;

  constructor(
    private ngZone: NgZone,
    private auth: AngularFireAuth, 
    private router: Router,
    private spinner: NgxSpinnerService,
    private notifications: NotificationsService
  ) { }

  initUser(setUserToTodos) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
        setUserToTodos({ email: user.email, uid: user.uid });
        this.ngZone.run(() => this.router.navigateByUrl('/todos'));
        this.notifications.success('Logged in.');
      }
      this.spinner.hide();
    });
  }

  async createUser(email, password) {
    this.spinner.show();

    // createUserWithEmailAndPassword will check this, BUT it also throws "email already in use"
    // error even when email is not registered, so that's why this little hack.
    if (await this.userExists(email)) {
      throw new Error('User already exists.');
    }
    
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  setUser(user) {
    this.currentUser = user;
  }

  async loginUser(email, password) {
    this.spinner.show();
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.router.navigateByUrl('/');
    this.auth.signOut();
  }

  async userExists(email) {
    const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
    
    if (signInMethods.length > 0) {
      return true;
    }

    return false;
  }
}
