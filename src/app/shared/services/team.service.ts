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
}
