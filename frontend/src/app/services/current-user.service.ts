import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/models/api_response';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient, private cookies: CookieService,
    private httpOptions: HttpOptionsService) {
      console.log('current-user-service constructed.');
  }

  setUsuarioActual(usuario: Usuario) {
    this.cookies.set('PHPSESSID', usuario.phpsessid, 1);
    this.cookies.set('email_current_user', usuario.email);
  }

  deleteUsuarioActual(): Observable<ApiResponse<boolean>> {
    var url = "http://localhost/bdt/php/src/logout.php?phpsessid=" + this.cookies.get('PHPSESSID');
    return this.http.post<ApiResponse<boolean>>(url, null, this.httpOptions);
  }

  getUsuarioActual() : Observable<ApiResponse<Usuario>> {
    if (!this.haySesionActiva()) {
      return of({
        code: 404,
        success: false,
        message: 'No hay sesión activa.',
        data: null
      });
    }

    var url = "http://localhost/bdt/php/src/whoami.php?phpsessid=" + this.cookies.get('PHPSESSID');
    return this.http.get<ApiResponse<Usuario>>(url, this.httpOptions);
  }

  getEmailUsuarioActual() : string {
    return this.cookies.get('email_current_user');
  }

  haySesionActiva() : boolean {
    return this.cookies.check('PHPSESSID');
  }
  
}
