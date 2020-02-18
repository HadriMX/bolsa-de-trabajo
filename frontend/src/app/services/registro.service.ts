import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private endpointUrl = environment.hostUrl + 'registrar_usuario.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  registrar(usuario: Usuario): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.endpointUrl, usuario, this.httpOptions);
  }
}
