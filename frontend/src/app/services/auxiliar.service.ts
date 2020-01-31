import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

  private endpointUrlGetAuxiliares = 'http://localhost/bdt/php/src/auxiliarAdmin/get_auxiliares.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  get_auxiliares(estatus:string): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(this.endpointUrlGetAuxiliares, this.httpOptions);
  }
}
