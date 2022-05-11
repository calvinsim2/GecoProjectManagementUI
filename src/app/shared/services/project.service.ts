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
}
