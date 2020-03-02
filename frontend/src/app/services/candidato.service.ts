import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../models/candidato';
import { ApiResponse } from '../models/api_response';
import { Observable } from 'rxjs';
import { HttpOptionsService } from './http-options.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  numero: Number;

  private endpointUrlGetCandidatos = environment.hostUrl + 'candidato/get_candidato.php';
  private endpointUrlGetCandidatoInfoCompleta = environment.hostUrl + 'candidato/get_candidatoInfoCompleta.php';
  private endpointUrlGuardarInfoCandidato = environment.hostUrl + 'candidato/update_candidato.php';
  private endpointUrlUpdateEstatusCandidato = environment.hostUrl + 'candidato/updateEstatusCandidato.php';
  private endpointUrlRegistrarCandidato = environment.hostUrl + 'candidato/registrar_candidato.php';
  private endpointUrlNumeroUsuarios = environment.hostUrl + 'candidato/get_numero_usuarios.php';

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  get_candidatos(estatus: string): Observable<ApiResponse<Candidato[]>> {
    return this.http.post<ApiResponse<Candidato[]>>(this.endpointUrlGetCandidatos, { estatus: estatus }, this.httpOptions);
  }

  get_candidatosInfoCompleta(): Observable<ApiResponse<Candidato>> {
    return this.http.get<ApiResponse<Candidato>>(this.endpointUrlGetCandidatoInfoCompleta, this.httpOptions);
  }

  guardarInfoCandidato(info: FormData): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlGuardarInfoCandidato, info);
  }

  update_estatusCandidato(estatus: string, id_usuario): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlUpdateEstatusCandidato, { estatus: estatus, id_usuario: id_usuario }, this.httpOptions);
  }

  registrar_candidato(info: FormData): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlRegistrarCandidato, info);
  }

  get_numero_usuarios(estatus: string, id_tipo_usuario): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.endpointUrlNumeroUsuarios, { estatus: estatus, id_tipo_usuario: id_tipo_usuario }, this.httpOptions);
  }

  aceptarCandidato(estatus: string, id_usuario, email:string): Observable<ApiResponse<Candidato>> {
    return this.http.post<ApiResponse<Candidato>>(this.endpointUrlUpdateEstatusCandidato, { estatus: estatus, id_usuario: id_usuario, email:email }, this.httpOptions);
  }

}
