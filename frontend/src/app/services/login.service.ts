import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInfo } from '../models/login_info';
import { ApiResponse } from '../models/api_response';
import { Usuario } from '../models/usuario';
import { HttpOptionsService } from './http-options.service';
import { CurrentUserService } from './current-user.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpointUrl = environment.hostUrl + 'login.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService,
    private currentUserService: CurrentUserService, private cookies: CookieService) { }

  login(loginInfo: LoginInfo): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.endpointUrl, loginInfo, this.httpOptions);
  }

  logout(): Promise<ApiResponse<boolean>> {
    var output = this.currentUserService.deleteUsuarioActual().then((response) => {
      if (response.success) {
        this.cookies.delete(this.currentUserService.CURRENT_USER_COOKIE);
      }

      return response;
    });

    return output;
  }

}
