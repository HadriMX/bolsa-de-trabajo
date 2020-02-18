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

  private endpointUrlBusquedaVacantes = 'http://localhost/bdt/php/src/vacante/busqueda_vacante.php';
  private endpointUrlGetMisVacantes = 'http://localhost/bdt/php/src/vacante/get_mis_vacantes.php';
  private endpointUrlAddVacante = 'http://localhost/bdt/php/src/vacante/add_vacante.php';
  private endpointUrlComprobarPertenenciaVacante = 'http://localhost/bdt/php/src/vacante/comprobarPertenenciaVacante.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  busquedaVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrlBusquedaVacantes, busqueda, this.httpOptions);
  }

  getMisVacantes(estatus: string): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrlGetMisVacantes, { estatus: estatus } ,this.httpOptions);
  }

  addVacante(vacante: Vacante): Observable<ApiResponse<Vacante>> {
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlAddVacante, vacante, this.httpOptions);
  }

  comprobarPertenenciaVacante(id_vacante: number): Observable<ApiResponse<Vacante>>{
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlComprobarPertenenciaVacante, {id_vacante: id_vacante}, this.httpOptions);
  }
  
}
