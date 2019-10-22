import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { RegistroService } from '../../services/registro.service';
import Swal from 'sweetalert2';

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

  constructor(private registroservice: RegistroService) { }

  ngOnInit() {
  }
  
  crear() {
    this.btnCrearClicked = true;

    this.registroservice.registrar(this.nuevoUsuario)
      .subscribe((response) => {
        if (response.success)
        {
          Swal.fire("correcto", response.message, 'success');
          $("#input100").val('');
          $("#input101").val('');
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.btnCrearClicked = false;
      });
  }

}
