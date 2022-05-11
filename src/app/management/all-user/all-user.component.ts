import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss'],
})
export class AllUserComponent implements OnInit {
  userList: any = [];
  currentSelectedUserIDtoDelete!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        this.userList = res.result;
        if (this.userList.length < 1) {
          this.userList = [];
        }
        console.log(this.userList);
      },
      error: (err) => {
        alert('Error fetching, try again later.');
      },
    });
  }

  viewUser(id: any) {
    this.router.navigate([`management/users/${id}`]);
  }

  onDeleteUser(id: any) {
    this.currentSelectedUserIDtoDelete = id;
  }

  deleteUser() {
    this.userService.deleteUser(this.currentSelectedUserIDtoDelete).subscribe({
      next: (res) => {
        alert('Employee has been deleted');
        document.getElementById('close-emp-comment')?.click();
        this.currentSelectedUserIDtoDelete = null;
        this.getAllUsers();
      },
      error: (err) => {
        alert('An unexpected error occured, try again later.');
      },
    });
  }
}
