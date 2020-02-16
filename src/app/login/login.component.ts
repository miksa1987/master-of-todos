import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    public userService: UserService, 
    public router: Router
  ) { }

  setEmail(newValue) {
    this.email = newValue;
  }

  setPassword(newValue) {
    this.password = newValue;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  login() {
    this.userService.loginUser(this.email, this.password);
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
