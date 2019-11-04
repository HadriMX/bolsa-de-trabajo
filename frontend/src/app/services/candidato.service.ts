import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postulacion } from '../models/postulacion';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';


import { CurrentUserService } from './current-user.service';
import { HttpOptionsService } from './http-options.service';


@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  private endpointUrl = 'http://localhost/bdt/php/src/candidato/postular_candidato.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService,
    private currentUserService: CurrentUserService) { }

    addPostulacion(id_vacante: number): Observable<ApiResponse<Postulacion>> {
      var url = this.currentUserService.agregarPhpsessidEnUrl(this.endpointUrl);
      return this.http.post<ApiResponse<Postulacion>>(url, { id_vacante: id_vacante } , this.httpOptions);
    }
}
