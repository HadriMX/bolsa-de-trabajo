import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo } from '../api/models/login_info';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/api/models/api_response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpointUrl = 'http://localhost/bdt/php/login.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private	http: HttpClient) { }

  login(email: string, pwd: string): Observable<ApiResponse<boolean>> {
    var loginInfo: LoginInfo = {
      email: email,
      pwd: pwd
    };

    return this.http.post<ApiResponse<boolean>>(this.endpointUrl, loginInfo, this.httpOptions);
  }

}
