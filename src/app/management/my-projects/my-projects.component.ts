import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { formatDate } from '@angular/common';

type Project = {
  projectID: number;
  projectName: string;
  projectDescription: string;
  planStartDate: Date;
  planEndDate: Date;
};

type MyProject = {
  project: Project;
};

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
})
export class MyProjectsComponent implements OnInit {
  public _myProjects: Array<MyProject> = [];
  constructor(
    private _projectService: ProjectService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._projectService
      .getProjectsByUserID(this._auth.getLoggedInUserID())
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this._myProjects = [...res.result];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  parseDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }
}
