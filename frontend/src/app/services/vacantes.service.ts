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

  busquedaVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    let url = 'http://localhost/bdt/php/src/vacante/busqueda_vacante.php';
    return this.http.post<ApiResponse<Vacante[]>>(url, busqueda, this.httpOptions);
  }

  getMisVacantes(): Observable<ApiResponse<Vacante[]>> {
    let url = 'http://localhost/bdt/php/src/vacante/get_mis_vacantes.php';
    return this.http.get<ApiResponse<Vacante[]>>(url, this.httpOptions);
  }

  addVacante(vacante: Vacante): Observable<ApiResponse<Vacante>> {
    let url = 'http://localhost/bdt/php/src/vacante/add_vacante.php';
    return this.http.post<ApiResponse<Vacante>>(url, vacante, this.httpOptions);
  }

  comprobarPertenenciaVacante(id_vacante: number): Observable<ApiResponse<Vacante>>{
    let url = 'http://localhost/bdt/php/src/vacante/comprobarPertenenciaVacante.php';
    return this.http.post<ApiResponse<Vacante>>(url, {id_vacante: id_vacante}, this.httpOptions);

  }
  
}
