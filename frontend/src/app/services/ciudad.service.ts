import { Injectable } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private endpointUrlGetCiudad = 'http://localhost/bdt/php/src/ciudad/get_ciudades.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getCiudades(id_entidad_federativa: number, id_municipio: number): Observable<ApiResponse<Ciudad[]>>{
    return this.http.post<ApiResponse<Ciudad[]>>(this.endpointUrlGetCiudad, {id_entidad_federativa: id_entidad_federativa, id_municipio: id_municipio} , this.httpOptions);
  }

}
