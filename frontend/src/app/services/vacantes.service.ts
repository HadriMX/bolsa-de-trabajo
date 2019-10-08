import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  private endpointUrl = 'http://localhost/bdt/php/src/vacante/vacante.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getVacantes(): Observable<ApiResponse<Vacante[]>> {
    return this.http.get<ApiResponse<Vacante[]>>(this.endpointUrl, this.httpOptions);
  }
}
