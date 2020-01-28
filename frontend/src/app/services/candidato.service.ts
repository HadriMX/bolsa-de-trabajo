import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postulacion } from '../models/postulacion';
import { Candidato } from '../models/candidato';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';


@Injectable({
  providedIn: 'root'
})
export class CandidatoService {


  private endpointUrlGetCandidatos = 'http://localhost/bdt/php/src/candidato/get_candidato.php';
  private endpointUrlDeleteCandidato = 'http://localhost/bdt/php/src/candidato/delete_candidato.php';
  private endpointUrlReactivarCandidato = 'http://localhost/bdt/php/src/candidato/reactivar_candidato.php';
  private endpointUrlAceptarCandidato = 'http://localhost/bdt/php/src/candidato/aceptar_candidato.php';
  private endpointUrlRechazarCandidato = 'http://localhost/bdt/php/src/candidato/rechazar_candidato.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_candidatos(estatus: string): Observable<ApiResponse<Candidato[]>> {
    return this.http.post<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, { estatus: estatus }, this.httpOptions);
  }

  delete_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlDeleteCandidato, id_usuario, this.httpOptions);
  }

  reactivar_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlReactivarCandidato, id_usuario, this.httpOptions);
  }

  aceptar_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlAceptarCandidato, id_usuario, this.httpOptions);
  }

  rechazar_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlRechazarCandidato, id_usuario, this.httpOptions);
  }
}
