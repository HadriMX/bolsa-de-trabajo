import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Postulacion } from '../models/postulacion';
import { Empresa } from '../models/empresa';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private endpointUrlGetEmpresas = 'http://localhost/bdt/php/src/empresa/get_empresas.php';
  private endpointUrlUpdateEstatusEmpresa='http://localhost/bdt/php/src/empresa/updateEstatusEmpresa.php';

  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_empresas(estatus: string): Observable<ApiResponse<Empresa[]>> {
    return this.http.post<ApiResponse<Empresa[]>>(this.endpointUrlGetEmpresas, { estatus: estatus }, this.httpOptions);
  }

  update_estatusEmpresa(estatus:string,id_usuario): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlUpdateEstatusEmpresa, {estatus:estatus,id_usuario:id_usuario}, this.httpOptions);
  }


}
