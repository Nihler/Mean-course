import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignup(loginForm: NgForm) {
    console.log(loginForm);
    if (loginForm.invalid) {
      return;
    }
    this.authService.createUser(
      loginForm.value.email,
      loginForm.value.password
    );
  }
}
