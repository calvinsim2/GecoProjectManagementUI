import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-ind-user',
  templateUrl: './ind-user.component.html',
  styleUrls: ['./ind-user.component.scss'],
})
export class IndUserComponent implements OnInit {
  userId!: any;
  userData!: any;
  isActualUser: boolean = false;
  public userForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.userId = id['id'];
    });

    this.userForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
    });

    this.getUserDetails();
    this.isActualUser = this.authService.getLoggedInUserID() == this.userId;
  }

  getUserDetails() {
    this.userService.getUserbyId(Number(this.userId)).subscribe({
      next: (res) => {
        this.userData = res.result;
        console.log(this.userData);
      },
      error: (err) => {
        alert(err.message);
        this.router.navigate([`management/dashboard`]);
      },
    });
  }

  onEditUser() {
    this.userForm.controls['Username'].setValue(this.userData.username);
    this.userForm.controls['Email'].setValue(this.userData.email);
    this.userForm.controls['FirstName'].setValue(this.userData.firstName);
    this.userForm.controls['LastName'].setValue(this.userData.lastName);
    console.log(this.userForm.value);
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.getUserDetails();
        this.userForm.reset();
        document.getElementById('close-emp')?.click();
      },
      error: (err) => {
        alert(`${err.error.message}`);
      },
    });
  }
}
