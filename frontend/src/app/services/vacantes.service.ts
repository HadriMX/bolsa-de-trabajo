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
  private endpointUrlComprobarPertenenciaVacante = environment.hostUrl + 'vacante/comprobarPertenenciaVacante.php';
  private endpointUrlCerrarVacante = environment.hostUrl + 'vacante/cerrar_vacante.php';
  private endpointUrlAbrirVacante = environment.hostUrl + 'vacante/abrir_vacante.php';
  private endpointUrlUpdateEstatusVacante = environment.hostUrl + 'vacante/update_estatus_vacante.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  busquedaVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrlBusquedaVacante, busqueda, this.httpOptions);
  }

  getMisVacantes(estatus:string): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrlGetMisVacantes, {estatus:estatus},this.httpOptions);
  }

  addVacante(vacante: Vacante): Observable<ApiResponse<Vacante>> {
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlAddVacante, vacante, this.httpOptions);
  }

  comprobarPertenenciaVacante(id_vacante: number): Observable<ApiResponse<Vacante>> {
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlComprobarPertenenciaVacante, { id_vacante: id_vacante }, this.httpOptions);
  }

  cerrarVacante(id_vacante: number): Observable<ApiResponse<Vacante>>{
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlCerrarVacante, {id_vacante:id_vacante}, this.httpOptions);
  }

  abrirVacante(id_vacante: number): Observable<ApiResponse<Vacante>>{
    return this.http.post<ApiResponse<Vacante>>(this.endpointUrlAbrirVacante, {id_vacante:id_vacante}, this.httpOptions);
  }

  updateEstatusVacante(id_vacante: number,email1: string, email2:string, motivo:string): Observable<ApiResponse<Vacante>>{
    return this.http.put<ApiResponse<Vacante>>(this.endpointUrlUpdateEstatusVacante, {id_vacante:id_vacante, email1:email1, email2:email2, motivo:motivo}, this.httpOptions);
  }

}
