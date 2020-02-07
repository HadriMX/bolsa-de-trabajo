import { Injectable } from '@angular/core';
import { Cat_empresa } from 'src/app/models/categoria';
import { Solicitudes } from 'src/app/models/solicitudes'
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatEmpresaService {
  private endpointUrlAddCategoria = 'http://localhost/bdt/php/src/categoria/add_categoria.php';
  private endpointUrlGeCategorias ='http://localhost/bdt/php/src/categoria/get_categorias.php';
  private endpointUrlGeCategoriasEmpresa ='http://localhost/bdt/php/src/categoria/get_categoriasEmpresa.php';
  private endpointUrlUpdateCategoria='http://localhost/bdt/php/src/categoria/update_categoria.php';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  add_categoria(categoria:Cat_empresa):Observable<ApiResponse<Cat_empresa>>{
    return this.http.post<ApiResponse<Cat_empresa>>(this.endpointUrlAddCategoria, categoria ,this.httpOptions);
  } 

  get_categoriasAdmin(): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.get<ApiResponse<Cat_empresa[]>>(this.endpointUrlGeCategorias, this.httpOptions);
  }

  get_categoriasEmpresa(): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.get<ApiResponse<Cat_empresa[]>>(this.endpointUrlGeCategoriasEmpresa, this.httpOptions);
  }

  update_categoria(categoria:Cat_empresa):Observable<ApiResponse<Cat_empresa[]>>{
    return this.http.post<ApiResponse<Cat_empresa[]>>(this.endpointUrlUpdateCategoria, categoria ,this.httpOptions);
  }
}
