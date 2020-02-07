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
  private endpointUrlGetCandidatoInfoCompleta = "http://localhost/bdt/php/src/candidato/get_candidatoInfoCompleta.php";
  private endpointUrlGuardarInfoCandidato = "http://localhost/bdt/php/src/candidato/update_candidato.php";
  private endpointUrlUpdateEstatusCandidato = 'http://localhost/bdt/php/src/candidato/updateEstatusCandidato.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_candidatos(estatus: string): Observable<ApiResponse<Candidato[]>> {
    return this.http.post<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, { estatus: estatus }, this.httpOptions);
  }

  get_candidatosInfoCompleta(): Observable<ApiResponse<Candidato>> {
    return this.http.get<ApiResponse<Candidato>>(this.endpointUrlGetCandidatoInfoCompleta, this.httpOptions);
  }

  guardarInfoCandidato(info: FormData): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlGuardarInfoCandidato, info);
  }

  update_estatusCandidato(estatus: string, id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlUpdateEstatusCandidato, { estatus: estatus, id_usuario: id_usuario }, this.httpOptions);
  }

}
