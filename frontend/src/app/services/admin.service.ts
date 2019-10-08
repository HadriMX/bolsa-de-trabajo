import { Injectable } from '@angular/core';
import { Area, Cat_empresa } from 'src/app/models/admin';
import { Solicitudes } from 'src/app/models/solicitudes'
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private endpointUrl = 'http://localhost/bdt/php/src/admin/admin.php';
  private endpointUrlAreas ='http://localhost/bdt/php/src/admin/get_areas.php';
  private endpointUrlCategorias ='http://localhost/bdt/php/src/admin/get_categorias.php';
  private endpointUrlSolicitudes= 'http://localhost/bdt/php/src/admin/get_solicitudes.php';
  private endpointUrlUpdateCat='http://localhost/bdt/php/src/admin/update_categoria.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  add_area(area: Area): Observable<ApiResponse<Area>> {
    return this.http.post<ApiResponse<Area>>(this.endpointUrl, area, this.httpOptions);
  }

  add_categoria(categoria:Cat_empresa):Observable<ApiResponse<Cat_empresa>>{
    return this.http.post<ApiResponse<Cat_empresa>>(this.endpointUrl, categoria ,this.httpOptions);
  }

  get_areas(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlAreas, this.httpOptions);
  }

  get_categorias(): Observable<ApiResponse<Cat_empresa[]>> {
    return this.http.get<ApiResponse<Cat_empresa[]>>(this.endpointUrlCategorias, this.httpOptions);
  }

  get_solicitudes(): Observable<ApiResponse<Solicitudes[]>> {
    return this.http.get<ApiResponse<Solicitudes[]>>(this.endpointUrlSolicitudes, this.httpOptions);
  }

  add_subarea(){
    
  }

  update_categorias(categoria:Cat_empresa):Observable<ApiResponse<Cat_empresa>>{
    return this.http.post<ApiResponse<Cat_empresa>>(this.endpointUrlUpdateCat, categoria ,this.httpOptions);
  }

 
}
