import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public userForm!: FormGroup;
  isProjectManager: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      TeamID: [2],
      RoleID: [2],
      IsProjectManager: [false],
    });
  }

  onAddPM() {
    this.isProjectManager = true;
  }

  onAddEmployee() {
    this.isProjectManager = false;
  }

  addUser() {
    this.userForm.value.IsProjectManager = this.isProjectManager;
    this.userService.addUser(this.userForm.value).subscribe({
      next: (res) => {
        alert(`Success - Welcome to our group!`);
        this.userForm.reset();
        document.getElementById('close-emp')?.click();
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert('Something went wrong, please try again later.');
      },
    });
  }

  navigateToLogIn() {
    this.router.navigate(['login']);
  }
}
