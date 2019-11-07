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

  constructor() { }
}
