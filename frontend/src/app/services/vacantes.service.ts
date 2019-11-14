import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  getVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    var url = 'http://localhost/bdt/php/src/vacante/vacante.php';
    return this.http.post<ApiResponse<Vacante[]>>(url, busqueda, this.httpOptions);
  }

  getMisVacantes(): Observable<ApiResponse<Vacante[]>> {
    var url = 'http://localhost/bdt/php/src/vacante/get_vacantes.php';
    return this.http.get<ApiResponse<Vacante[]>>(url, this.httpOptions);
  }
}
