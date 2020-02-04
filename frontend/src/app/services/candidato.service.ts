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
  private endpointUrlUpdateEstatusCandidato ='http://localhost/bdt/php/src/candidato/updateEstatusCandidato.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_candidatos(estatus: string): Observable<ApiResponse<Candidato[]>> {
    return this.http.post<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, { estatus: estatus }, this.httpOptions);
  }
  update_estatusCandidato(estatus:string,id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlUpdateEstatusCandidato, {estatus:estatus,id_usuario:id_usuario}, this.httpOptions);
  }
}
