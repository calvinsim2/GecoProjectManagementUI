import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  userId: any = '1';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // navigation

  navigateToDashBoard() {
    this.router.navigate([`management/dashboard`]);
  }

  navigateToProjects() {
    this.router.navigate([`management/projects`]);
  }

  navigateToMyProjects() {
    this.router.navigate([`management/projects/${this.userId}`]);
  }

  navigateToUsers() {
    this.router.navigate(['management/users']);
  }

  navigateToRoles() {
    this.router.navigate(['management/roles']);
  }
}
