import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  private endpointUrl = 'http://localhost/bdt/php/src/vacante/vacante.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrl, busqueda, this.httpOptions);
  }


}
