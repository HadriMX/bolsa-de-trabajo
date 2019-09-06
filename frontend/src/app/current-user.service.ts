import { Injectable } from '@angular/core';
import { Usuario } from '../api/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public usuario : Usuario;

  constructor() { }
}
