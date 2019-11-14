import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Postulacion } from '../models/postulacion';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  private endpointUrlAddPostulacion = 'http://localhost/bdt/php/src/postulacion/postular_candidato.php';
  private endpointUrlGetPostPendientes = 'http://localhost/bdt/php/src/postulacion/getPostulaciones.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  addPostulacion(id_vacante: number): Observable<ApiResponse<Postulacion>> {
    return this.http.post<ApiResponse<Postulacion>>(this.endpointUrlAddPostulacion, { id_vacante: id_vacante }, this.httpOptions);
  }

  getPostulaciones(estatus: string): Observable<ApiResponse<Postulacion[]>>{
    return this.http.post<ApiResponse<Postulacion[]>>(this.endpointUrlGetPostPendientes, { estatus: estatus }, this.httpOptions);
  }

}
