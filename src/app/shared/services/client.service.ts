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

  getClient(id: number) {
    return this._httpclient.get(GlobalComponent.apiRootUrl + 'client/' + id);
  }
  addClient(client: FormData) {
    return this._httpclient.post(GlobalComponent.apiRootUrl + 'client', client);
  }
  updateClient(client: FormData) {
    return this._httpclient.put(
      GlobalComponent.apiRootUrl + 'client/update',
      client
    );
  }
}
