import { Injectable } from '@angular/core';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntidadesFederativasService {

  private endpointUrlGetEntidadesFederativas = environment.hostUrl + 'entidadFederativa/get_entidadesFederativas.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  getEntidadesFederativas(): Observable<ApiResponse<EntidadFederativa[]>> {
    return this.http.get<ApiResponse<EntidadFederativa[]>>(this.endpointUrlGetEntidadesFederativas, this.httpOptions);
  }

}
