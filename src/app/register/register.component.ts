import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = '';
  password = '';
  repeatedPassword = '';

  constructor(public userService: UserService, public router: Router) { }

  setEmail(newValue) {
    this.email = newValue;
  }

  setPassword(newValue) {
    this.password = newValue;
  }

  setRepeatedPassword(newValue) {
    this.repeatedPassword = newValue;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.register();
  }

  register() {
    this.checkIfPasswordsMatch(this.password, this.repeatedPassword);
    this.userService.createUser(this.email, this.password);
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

  checkIfPasswordsMatch(password: string, repeatedPassword: string) {
    if (password !== repeatedPassword) {
      throw new Error('Passwords do not match!');
    }
  }
}
