import { Injectable } from '@angular/core';
import { Usuario } from '../api/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public usuario : Usuario;
  public sesionIniciada : boolean = false;

  constructor() { }

  setUserLoggedIn(usuario: Usuario) {
    this.sesionIniciada = true;
    this.usuario = usuario;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  getUserLoggedIn() : Usuario {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
