import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';

type Client = {
  clientID: number;
  clientName: string;
  clientAddress: string;
};

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public _clients: Array<Client> = [];
  public isEdit: boolean = false;
  public clientForm: FormGroup;

  constructor(private _clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      clientID: 0,
      clientName: '',
      clientAddress: '',
    });
  }

  ngOnInit(): void {
    this.reloadClients();
  }

  reloadClients() {
    console.log('reloadClients');
    this._clientService.getClients().subscribe({
      next: (res: any) => {
        // console.log(res);
        this._clients = [...res.result];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearClientForm() {
    this.isEdit = false;
    this.clientForm.setValue({
      clientID: 0,
      clientName: '',
      clientAddress: '',
    });
  }

  loadClientForm(id: number) {
    this.isEdit = true;
    this._clientService.getClient(id).subscribe({
      next: (res: any) => {
        let client = res.result;
        console.log('client loaded', client);
        this.clientForm.setValue({
          clientID: client.clientID,
          clientName: client.clientName,
          clientAddress: client.clientAddress,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  addClient() {
    console.log(this.clientForm.value);
    this._clientService.addClient(this.clientForm.value).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.reloadClients();
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  updateClient() {
    console.log(this.clientForm.value);
    this._clientService.updateClient(this.clientForm.value).subscribe({
      next: (res) => {
        console.log('res', res);
        this.reloadClients();
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  submit() {
    if (this.isEdit) {
      this.updateClient();
    } else {
      this.addClient();
    }
  }
}
