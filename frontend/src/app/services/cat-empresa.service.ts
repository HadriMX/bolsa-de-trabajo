import { Injectable } from '@angular/core';
import { Cat_empresa } from 'src/app/models/categoria';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class CatEmpresaService {
  private endpointUrlAddCategoria = environment.hostUrl + 'categoria/add_categoria.php';
  private endpointUrlGeCategorias = environment.hostUrl + 'categoria/get_categorias.php';
  private endpointUrlGeCategoriasEmpresa = environment.hostUrl + 'categoria/get_categoriasEmpresa.php';
  private endpointUrlUpdateCategoria = environment.hostUrl + 'categoria/update_categoria.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  add_categoria(categoria: Cat_empresa): Observable<ApiResponse<Cat_empresa>> {
    return this.http.post<ApiResponse<Cat_empresa>>(this.endpointUrlAddCategoria, categoria, this.httpOptions);
  }

  get_categoriasAdmin(): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.get<ApiResponse<Cat_empresa[]>>(this.endpointUrlGeCategorias, this.httpOptions);
  }

  get_categoriasEmpresa(): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.get<ApiResponse<Cat_empresa[]>>(this.endpointUrlGeCategoriasEmpresa, this.httpOptions);
  }

  update_categoria(categoria: Cat_empresa): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.post<ApiResponse<Cat_empresa[]>>(this.endpointUrlUpdateCategoria, categoria, this.httpOptions);
  }
}
