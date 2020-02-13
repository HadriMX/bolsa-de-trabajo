import { Injectable } from '@angular/core';
import { Area } from 'src/app/models/area';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private endpointUrlAddArea = 'http://localhost/bdt/php/src/area/add_area.php';
  private endpointUrlGetAreas ='http://localhost/bdt/php/src/area/get_areas.php';
  private endpointUrlUpdateArea='http://localhost/bdt/php/src/area/update_area.php';
  private endpointUrlGetAreasMenu ='http://localhost/bdt/php/src/area/get_areasMenu.php';
  private endpointUrlGetAreasReporte= 'http://localhost/bdt/php/src/area/get_areasReporte.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  add_area(area: Area): Observable<ApiResponse<Area>> {
    return this.http.post<ApiResponse<Area>>(this.endpointUrlAddArea, area, this.httpOptions);
  }

  get_areasAdmin(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreas, this.httpOptions);
  }

  get_areasMenu(): Observable<ApiResponse<Area[]>>{
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreasMenu, this.httpOptions);
  }

  get_areasReporte():Observable<ApiResponse<Area[]>>{
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreasReporte,this.httpOptions);
  }

  update_area(area:Area):Observable<ApiResponse<Area[]>>{
    return this.http.post<ApiResponse<Area[]>>(this.endpointUrlUpdateArea, area ,this.httpOptions);
  }


}
