import { Injectable } from '@angular/core';
import { Area } from 'src/api/models/area';
import { ApiResponse } from 'src/api/models/api_response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private endpointUrl = 'http://localhost/bdt/php/src/admin.php';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  add_area(area: Area): Observable<ApiResponse<Area>> {
    return this.http.post<ApiResponse<Area>>(this.endpointUrl, area, this.httpOptions);
  }
 
}
