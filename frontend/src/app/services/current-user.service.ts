import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api_response';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public usuario : Usuario;
  
  constructor(private http: HttpClient, private cookies: CookieService,
    private httpOptionsService: HttpOptionsService) {
  }

  setUsuarioActual(usuario: Usuario) {
    this.usuario = usuario;
    this.cookies.set('PHPSESSID', usuario.phpsessid, 1);
    this.cookies.set('email_current_user', usuario.email);
  }

  deleteUsuarioActual(): Observable<ApiResponse<boolean>> {
    var url = "http://localhost/bdt/php/src/logout.php?phpsessid=" + this.cookies.get('PHPSESSID');
    return this.http.post<ApiResponse<boolean>>(url, this.httpOptionsService);
  }

  getUsuarioActual() : Observable<ApiResponse<Usuario>> {
    var url = "http://localhost/bdt/php/src/whoami.php?phpsessid=" + this.cookies.get('PHPSESSID');
    return this.http.get<ApiResponse<Usuario>>(url, this.httpOptionsService);
  }

  getEmailUsuarioActual() : string {
    return this.cookies.get('email_current_user');
  }

  haySesionActiva() : boolean {
    return this.cookies.check('PHPSESSID');
  }
  
}
