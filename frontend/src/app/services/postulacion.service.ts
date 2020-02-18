import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Postulacion } from '../models/postulacion';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  private endpointUrlAddPostulacion = environment.hostUrl + 'postulacion/postular_candidato.php';
  private endpointUrlGetPostPendientes = environment.hostUrl + 'postulacion/getPostulaciones.php';
  private endpointUrlDeletePostulacion = environment.hostUrl + 'postulacion/deletePostulacion.php';
  private endpointUrlGetPostulacionesPorVacante = environment.hostUrl + 'postulacion/get_postulacionesPorVacante.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  addPostulacion(id_vacante: number): Observable<ApiResponse<Postulacion>> {
    return this.http.post<ApiResponse<Postulacion>>(this.endpointUrlAddPostulacion, { id_vacante: id_vacante }, this.httpOptions);
  }

  getPostulaciones(estatus: string): Observable<ApiResponse<Postulacion[]>> {
    return this.http.post<ApiResponse<Postulacion[]>>(this.endpointUrlGetPostPendientes, { estatus: estatus }, this.httpOptions);
  }

  deletePostulacion(id_vacante: number): Observable<ApiResponse<Postulacion>> {
    return this.http.post<ApiResponse<Postulacion>>(this.endpointUrlDeletePostulacion, { id_vacante: id_vacante }, this.httpOptions);
  }

  get_postulacionesPorVacante(id_vacante: number): Observable<ApiResponse<Postulacion[]>> {
    return this.http.post<ApiResponse<Postulacion[]>>(this.endpointUrlGetPostulacionesPorVacante, { id_vacante: id_vacante }, this.httpOptions);
  }

}
