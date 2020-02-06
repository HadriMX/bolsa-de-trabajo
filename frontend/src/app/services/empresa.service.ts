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
  private endpointUrlDeleteEmpresa = 'http://localhost/bdt/php/src/empresa/delete_empresa.php';
  private endpointUrlReactivar = 'http://localhost/bdt/php/src/empresa/reactivar_empresa.php';
  private endpointUrlGetEmpresaInfoCompleta = 'http://localhost/bdt/php/src/empresa/get_empresaInfoCompleta.php';
  private endpointUrlGuardarInfoEmpresa = "http://localhost/bdt/php/src/empresa/update_empresa.php";


  constructor(private http: HttpClient,
    private httpOptions: HttpOptionsService) { }

  get_empresas(estatus: string): Observable<ApiResponse<Empresa[]>> {
    return this.http.post<ApiResponse<Empresa[]>>(this.endpointUrlGetEmpresas, { estatus: estatus }, this.httpOptions);
  }

  delete_empresa(id_usuario: number): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlDeleteEmpresa, id_usuario, this.httpOptions);
  }

  reactivarEmpresa(id_usuario: number): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlReactivar, id_usuario, this.httpOptions);
  }

  get_empresaInfoCompleta(): Observable<ApiResponse<Empresa>>{
    return this.http.get<ApiResponse<Empresa>>(this.endpointUrlGetEmpresaInfoCompleta, this.httpOptions);
  }

  guardarInfoEmpresa(infoEmpresa : Empresa): Observable<ApiResponse<Empresa>>{
    return this.http.post<ApiResponse<Empresa>>(this.endpointUrlGuardarInfoEmpresa, infoEmpresa, this.httpOptions);
  }


}
