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
  private endpointUrlReactivarCandidato= 'http://localhost/bdt/php/src/candidato/reactivar_candidato.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_candidatos(): Observable<ApiResponse<Candidato[]>> {
    return this.http.get<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, this.httpOptions);
  }

  delete_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlDeleteCandidato, id_usuario, this.httpOptions);
  }

  reactivar_candidato(id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlDeleteCandidato, id_usuario, this.httpOptions);
  }
}
