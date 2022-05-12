import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { TeamComponent } from '../team/team.component';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-ind-user',
  templateUrl: './ind-user.component.html',
  styleUrls: ['./ind-user.component.scss'],
})
export class IndUserComponent implements OnInit {
  userId!: any;
  teamId!: any;
  userData!: any;
  isActualUser: boolean = false;
  isProjectManager: boolean = false;
  isEditingTeams: boolean = false;
  public roleList: any = [];
  public teamList: any = [];
  public userForm!: FormGroup;
  public teamForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id) => {
      this.userId = id['id'];
    });

    this.getUserDetails();
    this.getRoleDetails();
    this.getTeamDetails();

    this.userForm = this.formBuilder.group({
      UserID: [this.userId],
      Username: ['', Validators.required],
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      RoleID: [''],
    });
    this.teamForm = this.formBuilder.group({
      UserID: [this.userId],
      TeamID: [0],
    });

    this.isProjectManager = this.authService.getProjectManagerStatus();
    this.isActualUser = this.authService.getLoggedInUserID() == this.userId;
  }

  getRoleDetails() {
    this.roleService.getAllRole().subscribe({
      next: (res) => {
        if (res.result.length < 1) {
          this.teamList = [];
        } else {
          this.roleList = res.result;
        }
      },
      error: (err) => {
        alert(`${err.message}, there is a problem fetching roles.`);
      },
    });
  }

  getTeamDetails() {
    this.teamService.getAllTeams().subscribe({
      next: (res) => {
        if (res.result.length < 1) {
          this.teamList = [];
        } else {
          this.teamList = res.result;
        }
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
        console.log(this.userData);
        this.teamId = this.userData.teamID;
      },
      error: (err) => {
        alert(err.message);
        this.router.navigate([`management/dashboard`]);
      },
    });
  }

  onEditUser() {
    this.isEditingTeams = false;
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

  onEditTeams() {
    this.isEditingTeams = true;
    this.teamForm.value.UserID = this.userId;

    this.teamForm.controls['TeamID'].setValue(this.teamId);
  }

  editTeams() {
    this.userService.updateUserTeam(this.teamForm.value).subscribe({
      next: (res) => {
        alert(`${res.message} - Teams updated.`);
        this.getUserDetails();
        this.teamForm.reset();
        document.getElementById('close-emp')?.click();
      },
      error: (err) => {
        console.log(err);
        alert(`${err.error.message}`);
      },
    });
  }
}
