import { Injectable } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private endpointUrlGetCiudad = environment.hostUrl + 'ciudad/get_ciudades.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  getCiudades(id_entidad_federativa: number, id_municipio: number): Observable<ApiResponse<Ciudad[]>> {
    return this.http.post<ApiResponse<Ciudad[]>>(this.endpointUrlGetCiudad, { id_entidad_federativa: id_entidad_federativa, id_municipio: id_municipio }, this.httpOptions);
  }

}
