import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseApiUrl: string = 'https://localhost:7195/api/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(loginObj: any) {
    return this.http.post<any>(`${this.baseApiUrl}login`, loginObj);
  }

  // changingPassword(userObj: any) {
  //   return this.http.put<any>(
  //     'https://localhost:44364/api/Auth/changepassword',
  //     userObj, this.httpOptionsProvider()
  //   );
  // }

  resetPassword(userObj: any) {
    return this.http.put<any>(
      `${this.baseApiUrl}reset`,
      userObj,
      this.httpOptionsProvider()
    );
  }

  httpOptionsProvider() {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.getToken(),
      }),
    };
    return options;
  }

  isUserLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedInUserID() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      return decodedJWT.UserId ? decodedJWT.UserId : '';
    }
  }

  getLoggedInRole() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      return decodedJWT.Role ? decodedJWT.Role : '';
    }
  }

  getProjectManagerStatus() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      return decodedJWT.IsProjectManager ? decodedJWT.IsProjectManager : false;
    }
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.clear();
  }

  private getToken() {
    return localStorage.getItem('token')!;
  }
}
