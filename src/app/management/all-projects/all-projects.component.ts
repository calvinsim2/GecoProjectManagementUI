import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectDto } from 'src/app/shared/models/project.dto';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { UserService } from 'src/app/shared/services/user.service';
import { formatDate } from '@angular/common';

type Client = {
  clientID: number;
  clientName: string;
};

type User = {
  userID: number;
  username: string;
};

type ProjectMember = {
  projectMemberID: number;
  userID: number;
  user: User;
  projectID: number;
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
  public _projectMembers: Array<ProjectMember> = [];
  public _targetProjectID: number = 0;
  public projectForm: FormGroup;
  public projectMemberForm: FormGroup;
  public isEdit: boolean = false;

  constructor(
    private _projectService: ProjectService,
    private _userService: UserService,
    private _clientService: ClientService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      projectID: [0],
      projectName: ['Project Name'],
      projectDescription: ['Project Description'],
      planStartDate: null,
      planEndDate: null,
      actualStartDate: null,
      actualEndDate: null,
      clientID: 0,
      projectManagerID: 0,
    });

    this.projectMemberForm = this.fb.group({
      projectMemberID: 0,
      projectID: 0,
      userID: 0,
    });
  }

  clearProjectForm() {
    this.isEdit = false;
    this.projectForm.setValue({
      projectID: 0,
      projectName: 'Project Name',
      projectDescription: 'Project Description',
      planStartDate: null,
      planEndDate: null,
      actualStartDate: null,
      actualEndDate: null,
      clientID: 0,
      projectManagerID: 0,
    });
  }

  loadProjectForm(id: number) {
    this.isEdit = true;
    this._projectService.getProject(id).subscribe({
      next: (res: any) => {
        let project = res.result;
        console.log('projct loaded', project);
        this.projectForm.setValue({
          projectID: project.projectID,
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          planStartDate: formatDate(project.planStartDate, 'yyyy-MM-dd', 'en'),

          planEndDate: formatDate(project.planEndDate, 'yyyy-MM-dd', 'en'),
          actualStartDate: formatDate(
            project.actualStartDate,
            'yyyy-MM-dd',
            'en'
          ),
          actualEndDate: formatDate(project.actualEndDate, 'yyyy-MM-dd', 'en'),
          clientID: project.clientID,
          projectManagerID: project.projectManagerID,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.reloadPost();
  }

  reloadPost() {
    console.log('reloadPost');
    this._projectService.getProjects().subscribe({
      next: (res: any) => {
        // console.log(res);
        this._projects = [...res.result];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.reloadFilteredUsers();
    this._clientService.getClients().subscribe({
      next: (res: any) => {
        // console.log(res);
        this._clientNames = res.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reloadFilteredUsers() {
    this._userService.getAllUser().subscribe({
      next: (res: any) => {
        // console.log(res);
        this._userNames = res.result.filter(
          (user: User) =>
            !this._projectMembers.some(
              (projectMember) => projectMember.userID === user.userID
            )
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setProjectIDAndReloadProjectMember(projectID: number) {
    this._targetProjectID = projectID;
    this.reloadProjectMembers(projectID);
    this.reloadFilteredUsers();
  }

  reloadProjectMembers(id: number) {
    this._projectService.getProjectMembersByProjectID(id).subscribe({
      next: (res: any) => {
        console.log(res.result);
        this._projectMembers = res.result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  addProject() {
    console.log(this.projectForm.value);
    this._projectService.addProject(this.projectForm.value).subscribe({
      next: (res) => {
        console.log('res', res);
        this.reloadPost();
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

  updateProject() {
    console.log(this.projectForm.value);
    this._projectService.editProject(this.projectForm.value).subscribe({
      next: (res) => {
        console.log('res', res);
        this.reloadPost();
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  submit() {
    if (this.isEdit) {
      this.updateProject();
    } else {
      this.addProject();
    }
  }

  addMemberToProject() {
    this.projectMemberForm.patchValue({
      projectID: this._targetProjectID,
    });
    console.log(this.projectMemberForm.value['UserID']);
    this._projectService
      .addMemberToProject(this.projectMemberForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('res', res);
          this.reloadProjectMembers(this._targetProjectID);
          this.reloadFilteredUsers();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  removeMemberFromProject(projectMemberID: number) {
    this._projectService.removeMemberFromProject(projectMemberID).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.reloadProjectMembers(this._targetProjectID);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
