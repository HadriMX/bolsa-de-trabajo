import { Injectable } from '@angular/core';
import { Area } from 'src/app/models/area';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private endpointUrlAddArea = environment.hostUrl + 'area/add_area.php';
  private endpointUrlGetAreas = environment.hostUrl + 'area/get_areas.php';
  private endpointUrlUpdateArea = environment.hostUrl + 'area/update_area.php';
  private endpointUrlGetAreasMenu = environment.hostUrl + 'area/get_areasMenu.php';
  private endpointUrlGetAreasReporte = environment.hostUrl + 'area/get_areasReporte.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  add_area(area: Area): Observable<ApiResponse<Area>> {
    return this.http.post<ApiResponse<Area>>(this.endpointUrlAddArea, area, this.httpOptions);
  }

  get_areasAdmin(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreas, this.httpOptions);
  }

  get_areasMenu(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreasMenu, this.httpOptions);
  }

  get_areasReporte(): Observable<ApiResponse<Area[]>> {
    return this.http.get<ApiResponse<Area[]>>(this.endpointUrlGetAreasReporte, this.httpOptions);
  }

  update_area(area: Area): Observable<ApiResponse<Area[]>> {
    return this.http.post<ApiResponse<Area[]>>(this.endpointUrlUpdateArea, area, this.httpOptions);
  }

}
