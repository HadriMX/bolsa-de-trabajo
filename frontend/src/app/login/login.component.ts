import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/api/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() nuevoUsuario: Usuario = {
    id_usuario: 0,
    email: '',
    password: '',
    id_tipo_usuario: 1,
    estatus: '',
    phpsessid: ''
  }
  constructor() { }

  ngOnInit() {
  }
  
  crear() {
    
  }

}
