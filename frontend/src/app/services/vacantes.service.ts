import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  private endpointUrlBusquedaVacante = environment.hostUrl + 'vacante/busqueda_vacante.php';
  private endpointUrlGetMisVacantes = environment.hostUrl + 'vacante/get_mis_vacantes.php';
  private endpointUrlAddVacante = environment.hostUrl + 'vacante/add_vacante.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  busquedaVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrlBusquedaVacante, busqueda, this.httpOptions);
  }

  getMisVacantes(): Observable<ApiResponse<Vacante[]>> {
    return this.http.get<ApiResponse<Vacante[]>>(this.endpointUrlGetMisVacantes, this.httpOptions);
  }

  addVacante(vacante: Vacante): Observable<ApiResponse<Vacante>> {
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlAddVacante, vacante, this.httpOptions);
  }

  comprobarPertenenciaVacante(id_vacante: number): Observable<ApiResponse<Vacante>> {
    let url = environment.hostUrl + 'vacante/comprobarPertenenciaVacante.php';
    return this.http.post<ApiResponse<Vacante>>(url, { id_vacante: id_vacante }, this.httpOptions);
  }

}
