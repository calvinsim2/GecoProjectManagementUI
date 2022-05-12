import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  managerName!: any;
  managerData!: any;
  managerTeamId!: any;
  projectsByManagerList!: any;
  isProjectByManagerEmpty!: boolean;
  teamName!: any;
  teamsList!: any;
  isTeamsListEmpty!: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    // console.log(this.authService.getLoggedInRole());
    // console.log(this.authService.getLoggedInUserID());
    // console.log(this.authService.getProjectManagerStatus());
    this.getManagerDetails();
    this.getProjectRelatedToManager();
  }

  getManagerDetails() {
    this.userService
      .getUserbyId(this.authService.getLoggedInUserID())
      .subscribe({
        next: (res) => {
          this.managerData = res.result;
          this.managerName = res.result.firstName + ' ' + res.result.lastName;
          this.managerTeamId = res.result.teamID;
          this.getTeam();
        },
        error: (err) => {
          alert('Unable to obtain name');
        },
      });
  }

  getProjectRelatedToManager() {
    this.projectService
      .getProjectsByProjectManager(this.authService.getLoggedInUserID())
      .subscribe({
        next: (res) => {
          if (res.result.length < 1) {
            this.projectsByManagerList = [];
            this.isProjectByManagerEmpty = true;
          } else {
            this.projectsByManagerList = res.result;
            this.projectsByManagerList.forEach((element: any) => {
              element.actualStartDate = !!element?.actualStartDate
                ? element?.actualStartDate.slice(0, 10)
                : null;
              element.actualEndDate = !!element?.actualEndDate
                ? element?.actualEndDate.slice(0, 10)
                : null;
              element.planStartDate = !!element?.planStartDate
                ? element?.planStartDate.slice(0, 10)
                : null;
              element.planEndDate = !!element?.planEndDate
                ? element?.planEndDate.slice(0, 10)
                : null;
            });
            this.isProjectByManagerEmpty = false;
            console.log(this.projectsByManagerList);
          }
        },
        error: (err) => {
          alert('Error fetching projects');
        },
      });
  }

  getTeam() {
    this.teamService.getIndividualTeam(this.managerTeamId).subscribe({
      next: (res) => {
        console.log(res.result);
        this.teamName = res.result.teamName;
        if (res.result.user.length < 1) {
          this.teamsList = [];
          this.isTeamsListEmpty = true;
        } else {
          this.teamsList = res.result.user;
          this.isTeamsListEmpty = false;
        }
      },
      error: (err) => {
        alert('Unable to obtain teams');
      },
    });
  }
}
