import { Component, OnInit } from '@angular/core';

// step 1, we need to import this 3 things to build angular forms
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          this.router.navigate([`management/dashboard`]);
        },
        error: (err) => {
          alert(`${err.error.statusCode} - ${err.error.message}`);
        },
      });
    } else {
      alert('Please ensure Email is in correct format, and password filled.');
    }
  }

  navigateToSignUp() {
    this.router.navigate(['signup']);
  }
}
