import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from '../../services/registro.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';

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

  btnCrearClicked: boolean;

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
  }

  crear() {
    this.btnCrearClicked = true;
    
    this.registroService.registrar(this.nuevoUsuario)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Cuenta creada", "Comprueba tu bandeja de entrada para verificar tu correo electrónico y continuar con el registro.", 'success');
          this.nuevoUsuario.email = '';
          this.nuevoUsuario.password = '';
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.btnCrearClicked = false;
      });
  }

}
