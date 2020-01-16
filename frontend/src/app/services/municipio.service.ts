import { Injectable } from '@angular/core';
import { Municipio } from 'src/app/models/municipio';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private endpointUrlGetMunicipio = 'http://localhost/bdt/php/src/municipio/get_municipios.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getMunicipios(id_entidad_federativa: number): Observable<ApiResponse<Municipio[]>>{
    return this.http.post<ApiResponse<Municipio[]>>(this.endpointUrlGetMunicipio, {id_entidad_federativa: id_entidad_federativa} , this.httpOptions);
  }

}
