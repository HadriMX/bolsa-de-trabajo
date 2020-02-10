import { Injectable } from '@angular/core';
import { Solicitudes } from 'src/app/models/solicitudes'
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private endpointUrlGetSolicitudes = environment.hostUrl + 'solicitud/get_solicitudes.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  get_solicitudes(): Observable<ApiResponse<Solicitudes[]>> {
    return this.http.get<ApiResponse<Solicitudes[]>>(this.endpointUrlGetSolicitudes, this.httpOptions);
  }
  
}
