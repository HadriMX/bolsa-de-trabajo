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

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  

  get_candidatos():Observable<ApiResponse<Candidato[]>> {
    return this.http.get<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, this.httpOptions);

  }
}
