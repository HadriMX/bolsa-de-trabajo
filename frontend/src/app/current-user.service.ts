import { Injectable } from '@angular/core';
import { Usuario } from '../api/models/usuario';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/api/models/api_response';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public usuario : Usuario;

  private endpointUrl = 'http://localhost/bdt/php/src/recuerdame.php';

  constructor(private http: HttpClient, private cookies: CookieService,
    private httpOptionsService: HttpOptionsService) {
  }

  setUsuarioActual(usuario: Usuario) {
    this.usuario = usuario;
    this.cookies.set('PHPSESSID', usuario.phpsessid, 1);
    this.cookies.set('email_current_user', usuario.email);
  }

  getUsuarioActual() : Observable<ApiResponse<Usuario>> {
    var url = this.endpointUrl + "?phpsessid=" + this.cookies.get('PHPSESSID');
    return this.http.get<ApiResponse<Usuario>>(url, this.httpOptionsService);
  }

  getEmailUsuarioActual() : string {
    return this.cookies.get('email_current_user');
  }

  haySesionActiva() : boolean {
    return this.cookies.check('PHPSESSID');
  }
  
}
