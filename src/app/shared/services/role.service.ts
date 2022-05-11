import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public baseApiUrl: string = 'https://localhost:7195/api/role/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllRole() {
    return this.http.get<any>(
      this.baseApiUrl,
      this.authService.httpOptionsProvider()
    );
  }

  // getRolebyId(id: any) {
  //   return this.http.get<any>(
  //     this.baseApiUrl + id,
  //     this.authService.httpOptionsProvider()
  //   );
  // }

  addRole(formData: any) {
    return this.http.post<any>(`${this.baseApiUrl}add`, formData);
  }

  updateRole(empObj: any) {
    return this.http.put<any>(
      `${this.baseApiUrl}update`,
      empObj,
      this.authService.httpOptionsProvider()
    );
  }

  deleteRole(id: any) {
    return this.http.delete<any>(
      `${this.baseApiUrl}${id}`,
      this.authService.httpOptionsProvider()
    );
  }
}
