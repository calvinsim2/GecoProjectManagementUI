import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global.components';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private _httpclient: HttpClient) {}

  getClients() {
    return this._httpclient.get(GlobalComponent.apiRootUrl + 'client');
  }
}
