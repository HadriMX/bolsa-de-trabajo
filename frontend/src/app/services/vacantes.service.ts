import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  private endpointUrl = 'http://localhost/bdt/php/src/vacante/busqueda_vacante.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  busquedaVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    return this.http.post<ApiResponse<Vacante[]>>(this.endpointUrl, busqueda, this.httpOptions);
  }
}
