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

  readonly CURRENT_USER_COOKIE = 'current_user';

  constructor(private http: HttpClient, private cookies: CookieService,
    private httpOptions: HttpOptionsService) { }

  setUsuarioActual(usuario: Usuario) {
    // TODO: guardar menos propiedades del usuario en lugar de stringify el usuario completo
    this.cookies.set(this.CURRENT_USER_COOKIE, JSON.stringify(usuario), 1);
  }

  deleteUsuarioActual(): Promise<ApiResponse<boolean>> {
    var url = "http://localhost/bdt/php/src/logout.php";
    return this.http.post<ApiResponse<boolean>>(url, null, this.httpOptions).toPromise();
  }

  getUsuarioActualDesdeServidor(): Observable<ApiResponse<Usuario>> {
    if (!this.haySesionActiva()) {
      return of({
        code: 404,
        success: false,
        message: 'No hay sesión activa.',
        data: null
      });
    }

    var url = "http://localhost/bdt/php/src/whoami.php?phpsessid=" + this.getPhpsessid();
    return this.http.get<ApiResponse<Usuario>>(url, this.httpOptions);
  }

  getUsuarioActual(): Usuario {
    if (!this.haySesionActiva()) {
      return null;
    }

    var currentUser = JSON.parse(this.cookies.get(this.CURRENT_USER_COOKIE));
    return currentUser;
  }

  getPhpsessid(): string {
    var currentUser = this.getUsuarioActual();

    if (currentUser == null) {
      return null;
    }

    return currentUser.phpsessid;
  }

  agregarPhpsessidEnUrl(url: string): string {
    return url + '?phpsessid=' + this.getPhpsessid();
  }

  haySesionActiva(): boolean {
    return this.cookies.check(this.CURRENT_USER_COOKIE) && this.tryParseJSON(this.cookies.get(this.CURRENT_USER_COOKIE));
  }

  haySesionAdminActiva(): boolean {
    return this.haySesionActiva() && this.getUsuarioActual().id_tipo_usuario == 0;
  }

  // fuente: https://stackoverflow.com/a/20392392
  tryParseJSON(jsonString: string) {
    try {
      var o = JSON.parse(jsonString);

      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // but... JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) { }

    return false;
  };

}
