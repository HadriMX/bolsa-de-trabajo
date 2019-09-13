import { Injectable } from '@angular/core';
import { Usuario } from '../api/models/usuario';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/api/models/api_response';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public usuario : Usuario;
  public sesionIniciada : boolean = false;

  private endpointUrl = 'http://localhost/bdt/php/recuerdame.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cookies: CookieService) { }

  setCurrentUser(usuario: Usuario) {
    this.sesionIniciada = true;
    this.usuario = usuario;
    // localStorage.setItem('phpsessid', JSON.stringify(usuario.phpsessid));
    this.cookies.set('PHPSESSID', usuario.phpsessid);
  }

  getUserLoggedIn() : Observable<ApiResponse<Usuario>> {
    // var currentPhpsessid = localStorage.getItem('phpsessid');
    var currentPhpsessid = this.cookies.get('PHPSESSID');

    var obj: any = {
      phpsessid: currentPhpsessid
    }

    var url = this.endpointUrl + "?phpsessid=" + currentPhpsessid;

    return this.http.get<ApiResponse<Usuario>>(url, this.httpOptions);
  }

}
