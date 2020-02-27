import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private endpointUrlNumeroUsuarios = environment.hostUrl + 'dashboard/get_numero_usuarios.php';
  private endpointUrlNumeroSolicitudes = environment.hostUrl + 'dashboard/get_numero_solicitudes.php';
  private endpointUrlNumeroVacantes = environment.hostUrl + 'dashboard/get_numero_vacantes.php';
  
  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }


  get_numero_usuarios(estatus: string, id_tipo_usuario): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.endpointUrlNumeroUsuarios, { estatus: estatus, id_tipo_usuario: id_tipo_usuario }, this.httpOptions);
  }

  get_numero_solicitudes(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.endpointUrlNumeroSolicitudes, this.httpOptions);
  }

  get_numero_vacantes(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(this.endpointUrlNumeroVacantes, this.httpOptions);
  }
}
