import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public userForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],

      TeamID: [''],
      RoleID: [''],
    });
  }

  navigateToLogIn() {
    this.router.navigate(['login']);
  }
}
