import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  roleList: any = [];
  currentSelectedRoleIDtoDelete!: any;
  isDeletingRole: boolean = false;
  public roleForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      RoleName: ['', Validators.required],
    });
    this.getAllRole();
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (res) => {
        this.roleList = res.result.length < 1 ? [] : res.result;
      },
      error: (err) => {
        alert('Error fetching, try again later.');
      },
    });
  }

  onCreateRole() {
    this.isDeletingRole = false;
    this.roleForm.reset();
  }

  createRole() {
    this.roleService.addRole(this.roleForm.value).subscribe({
      next: (res) => {
        alert('New Role Added!');
        this.roleForm.reset();
        document.getElementById('close-emp-comment')?.click();
        this.getAllRole();
      },
      error: (err) => {
        alert('An error occured, try again later');
      },
    });
  }

  onDeleteRole(id: any) {
    this.isDeletingRole = true;
    this.currentSelectedRoleIDtoDelete = id;
  }

  deleteRole() {
    this.roleService.deleteRole(this.currentSelectedRoleIDtoDelete).subscribe({
      next: (res) => {
        alert('Role has been deleted');
        document.getElementById('close-emp-comment')?.click();
        this.currentSelectedRoleIDtoDelete = null;
        this.getAllRole();
      },
      error: (err) => {
        alert('Error Deleting, try again later.');
      },
    });
  }
}
