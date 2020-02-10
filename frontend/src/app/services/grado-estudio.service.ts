import { Injectable } from '@angular/core';
import { GradoEstudio } from 'src/app/models/gradoEstudio';
import { ApiResponse } from 'src/app/models/api_response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpOptionsService } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class GradoEstudioService {

  private endpointUrlGetGradosEstudio = environment.hostUrl + 'gradoEstudio/get_gradosEstudio.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  getGradosEstudio(): Observable<ApiResponse<GradoEstudio[]>> {
    return this.http.get<ApiResponse<GradoEstudio[]>>(this.endpointUrlGetGradosEstudio, this.httpOptions);
  }

}
