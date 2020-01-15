import { Injectable } from '@angular/core';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntidadesFederativasService {

  private endpointUrlGetEntidadesFederativas = 'http://localhost/bdt/php/src/entidadFederativa/get_entidadesFederativas.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getEntidadesFederativas(): Observable<ApiResponse<EntidadFederativa[]>>{
    return this.http.get<ApiResponse<EntidadFederativa[]>>(this.endpointUrlGetEntidadesFederativas, this.httpOptions);
  }
  
}
