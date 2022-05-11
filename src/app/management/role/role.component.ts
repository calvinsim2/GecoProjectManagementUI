import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getAllRole();
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe({
      next: (res) => {
        this.roleList = res.result;
        if (this.roleList.length < 1) {
          this.roleList = [];
        }
        console.log(this.roleList);
      },
      error: (err) => {
        alert('Error fetching, try again later.');
      },
    });
  }

  onDeleteRole(id: any) {
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
