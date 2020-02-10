import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptionsService } from './http-options.service';
import { ApiResponse } from '../models/api_response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificacionEmailService {

  private endpointUrl = environment.hostUrl + 'verificar_email.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  verificar(codigo: string): Promise<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.endpointUrl, { codigo: codigo }, this.httpOptions).toPromise();
  }
  
}
