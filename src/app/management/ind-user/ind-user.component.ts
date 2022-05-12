import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-ind-user',
  templateUrl: './ind-user.component.html',
  styleUrls: ['./ind-user.component.scss'],
})
export class IndUserComponent implements OnInit {
  userId!: any;
  userData!: any;
  isActualUser: boolean = false;
  public roleList: any = [];
  public userForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.userId = id['id'];
    });

    this.getUserDetails();
    this.getRoleDetails();

    this.userForm = this.formBuilder.group({
      UserID: [this.userId],
      Username: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      RoleID: [''],
    });

    this.isActualUser = this.authService.getLoggedInUserID() == this.userId;
  }

  getRoleDetails() {
    this.roleService.getAllRole().subscribe({
      next: (res) => {
        this.roleList = res.result;
      },
      error: (err) => {
        alert(`${err.message}, there is a problem fetching roles.`);
      },
    });
  }

  getUserDetails() {
    this.userService.getUserbyId(Number(this.userId)).subscribe({
      next: (res) => {
        this.userData = res.result;
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
    this.userForm.controls['RoleID'].setValue(this.userData.roleID);
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe({
      next: (res) => {
        alert(
          `${res.message} - Please log in again for changes to take effect.`
        );
        this.getUserDetails();
        this.userForm.reset();
        document.getElementById('close-emp')?.click();
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert(`${err.error.message}`);
      },
    });
  }
}
