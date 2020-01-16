import { Injectable } from '@angular/core';
import { GradoEstudio } from 'src/app/models/gradoEstudio';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradoEstudioService {

  private endpointUrlGetGradosEstudio = 'http://localhost/bdt/php/src/gradoEstudio/get_gradosEstudio.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getGradosEstudio(): Observable<ApiResponse<GradoEstudio[]>>{
    return this.http.get<ApiResponse<GradoEstudio[]>>(this.endpointUrlGetGradosEstudio , this.httpOptions);
  }

}
