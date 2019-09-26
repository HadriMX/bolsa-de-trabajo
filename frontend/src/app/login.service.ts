import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../api/models/login_info';
import { ApiResponse } from '../api/models/api_response';
import { Usuario } from '../api/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpointUrl = 'http://localhost/bdt/php/login.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.endpointUrl, loginInfo, this.httpOptions);
  }

}
