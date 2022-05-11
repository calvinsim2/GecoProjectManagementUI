import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/app/shared/models/project.dto';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent implements OnInit {
  public _projects: Array<ProjectModel> = [];

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this._projectService.getProjects().subscribe({
      next: (res: any) => {
        console.log(res);
        this._projects = res.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
