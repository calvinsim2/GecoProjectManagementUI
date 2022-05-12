import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  userId!: any;
  loginStatus!: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserID();
    this.loginStatus = this.authService.isUserLogin() ? true : false;
  }

  logOut() {
    this.router.navigate(['login']);
  }
  // navigation

  navigateToDashBoard() {
    this.router.navigate([`management/dashboard`]);
  }

  navigateToProjects() {
    this.router.navigate([`management/projects`]);
  }

  navigateToMyProjects() {
    this.router.navigate([`management/myprojects/${this.userId}`]);
  }

  navigateToUsers() {
    this.router.navigate(['management/users']);
  }

  navigateToRoles() {
    this.router.navigate(['management/roles']);
  }
  navigateToClient() {
    this.router.navigate(['management/client']);
  }
}
