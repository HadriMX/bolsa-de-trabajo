import { Injectable } from '@angular/core';
import { Municipio } from 'src/app/models/municipio';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private endpointUrlGetMunicipio = environment.hostUrl + 'municipio/get_municipios.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  getMunicipios(id_entidad_federativa: number): Observable<ApiResponse<Municipio[]>> {
    return this.http.post<ApiResponse<Municipio[]>>(this.endpointUrlGetMunicipio, { id_entidad_federativa: id_entidad_federativa }, this.httpOptions);
  }

}
