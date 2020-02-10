import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private endpointUrlGetEmpresas = environment.hostUrl + 'empresa/get_empresas.php';
  private endpointUrlGetEmpresaInfoCompleta = environment.hostUrl + 'empresa/get_empresaInfoCompleta.php';
  private endpointUrlGuardarInfoEmpresa = environment.hostUrl + 'empresa/update_empresa.php';
  private endpointUrlUpdateEstatusEmpresa = environment.hostUrl + 'empresa/updateEstatusEmpresa.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  get_empresas(estatus: string): Observable<ApiResponse<Empresa[]>> {
    return this.http.post<ApiResponse<Empresa[]>>(this.endpointUrlGetEmpresas, { estatus: estatus }, this.httpOptions);
  }

  update_estatusEmpresa(estatus: string, id_usuario): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlUpdateEstatusEmpresa, { estatus: estatus, id_usuario: id_usuario }, this.httpOptions);
  }

  get_empresaInfoCompleta(): Observable<ApiResponse<Empresa>> {
    return this.http.get<ApiResponse<Empresa>>(this.endpointUrlGetEmpresaInfoCompleta, this.httpOptions);
  }

  guardarInfoEmpresa(infoEmpresa: Empresa): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlGuardarInfoEmpresa, infoEmpresa, this.httpOptions);
  }
  
}
