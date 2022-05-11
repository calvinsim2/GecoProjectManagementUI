import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getLoggedInRole());
    console.log(this.authService.getLoggedInUserID());
    console.log(this.authService.getProjectManagerStatus());
  }
}
