import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global.components';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private _httpclient: HttpClient) {}

  getAllTeams() {
    return this._httpclient.get<any>(GlobalComponent.apiRootUrl + 'team');
  }

  getIndividualTeam(id: any) {
    return this._httpclient.get<any>(GlobalComponent.apiRootUrl + 'team/' + id);
  }

  addTeam(formData: any) {
    return this._httpclient.post<any>(
      GlobalComponent.apiRootUrl + 'team/add',
      formData
    );
  }

  updateTeam(formData: any) {
    return this._httpclient.put<any>(
      GlobalComponent.apiRootUrl + 'team/update',
      formData
    );
  }

  deleteTeam(id: any) {
    return this._httpclient.delete<any>(
      GlobalComponent.apiRootUrl + 'team/' + id
    );
  }
}
