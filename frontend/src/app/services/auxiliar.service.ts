import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

  private endpointUrlGetAuxiliares = environment.hostUrl + 'auxiliarAdmin/get_auxiliares.php';
  private endpointUrlUpdateEstatusAuxiliarAdmin = environment.hostUrl + 'auxiliarAdmin/update_estatus_auxiliarAdmin.php'

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  get_auxiliares(estatus: string): Observable<ApiResponse<Usuario[]>> {
    return this.http.post<ApiResponse<Usuario[]>>(this.endpointUrlGetAuxiliares, { estatus: estatus }, this.httpOptions);
  }

  update_estatus_auxiliarAdmin(estatus, id_usuario): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.endpointUrlUpdateEstatusAuxiliarAdmin, { estatus: estatus, id_usuario: id_usuario }, this.httpOptions);
  }
}
