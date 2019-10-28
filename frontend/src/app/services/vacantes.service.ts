import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from 'src/app/models/vacantes';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { Busqueda } from '../models/busqueda';
import { CurrentUserService } from './current-user.service';
import { HttpOptionsService } from './http-options.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {

  private endpointUrl = 'http://localhost/bdt/php/src/vacante/vacante.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService,
    private currentUserService: CurrentUserService) { }

  getVacantes(busqueda: Busqueda): Observable<ApiResponse<Vacante[]>> {
    var url = this.currentUserService.agregarPhpsessidEnUrl(this.endpointUrl);
    return this.http.post<ApiResponse<Vacante[]>>(url, busqueda, this.httpOptions);
  }
}
