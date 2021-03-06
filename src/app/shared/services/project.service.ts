import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global.components';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _httpclient: HttpClient) {}

  getProjects() {
    return this._httpclient.get(GlobalComponent.apiRootUrl + 'project');
  }

  getProject(id: number) {
    return this._httpclient.get(GlobalComponent.apiRootUrl + 'project/' + id);
  }
  getProjectsByProjectManager(id: any) {
    return this._httpclient.get<any>(
      GlobalComponent.apiRootUrl + 'project/user/' + id
    );
  }

  getProjectsByUserID(id: any) {
    return this._httpclient.get<any>(
      GlobalComponent.apiRootUrl + 'projectmember/user/' + id
    );
  }

  getProjectMembers() {
    return this._httpclient.get<any>(
      GlobalComponent.apiRootUrl + 'projectmember'
    );
  }
  getProjectMembersByProjectID(id: number) {
    return this._httpclient.get<any>(
      GlobalComponent.apiRootUrl + 'projectmember/project/' + id
    );
  }

  addProject(project: FormData) {
    return this._httpclient.post(
      GlobalComponent.apiRootUrl + 'project',
      project
    );
  }

  addMemberToProject(projectMember: FormData) {
    return this._httpclient.post(
      GlobalComponent.apiRootUrl + 'projectmember',
      projectMember
    );
  }
  editProject(project: FormData) {
    return this._httpclient.put(
      GlobalComponent.apiRootUrl + 'project/update',
      project
    );
  }

  deleteProject(id: number) {
    return this._httpclient.delete(
      GlobalComponent.apiRootUrl + 'project/' + id
    );
  }
  removeMemberFromProject(id: number) {
    return this._httpclient.delete(
      GlobalComponent.apiRootUrl + 'projectmember/' + id
    );
  }
}
