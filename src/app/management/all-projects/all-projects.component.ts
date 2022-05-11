import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectDto } from 'src/app/shared/models/project.dto';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';

type Client = {
  clientID: number;
  clientname: string;
};

type User = {
  userID: number;
  username: string;
};

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
})
export class AllProjectsComponent implements OnInit {
  public _projects: Array<ProjectDto> = [];
  public _clientNames: Array<Client> = [];
  public _userNames: Array<User> = [];
  public projectForm: FormGroup;
  public isEdit: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _userService: UserService,
    private _clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      projectName: ['Project Name'],
      projectDescription: ['Project Description'],
      planStartDate: null,
      planEndDate: null,
      actualStartDate: null,
      actualEndDate: null,
      clientID: 0,
      ProjectManagerID: 0,
    });
  }

  ngOnInit(): void {
    this.reloadPost();
  }

  reloadPost() {
    this._projectService.getProjects().subscribe({
      next: (res: any) => {
        console.log(res);
        this._projects = res.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._userService.getAllUser().subscribe({
      next: (res: any) => {
        console.log(res);
        this._userNames = res.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._clientService.getClients().subscribe({
      next: (res: any) => {
        console.log(res);
        this._clientNames = res.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProject() {
    this._projectService.addProject(this.projectForm.value).subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  deleteProject(id: number) {
    this._projectService.deleteProject(id).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.reloadPost();
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  updateProject() {}

  submit() {
    if (this.isEdit) {
      this.updateProject();
    } else {
      this.addProject();
    }
  }
}
