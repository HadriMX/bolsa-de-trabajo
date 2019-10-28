import { Injectable } from '@angular/core';
import { Solicitudes } from 'src/app/models/solicitudes'
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private endpointUrlGetSolicitudes= 'http://localhost/bdt/php/src/solicitud/get_solicitudes.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  get_solicitudes(): Observable<ApiResponse<Solicitudes[]>> {
    return this.http.get<ApiResponse<Solicitudes[]>>(this.endpointUrlGetSolicitudes, this.httpOptions);
  }
}
