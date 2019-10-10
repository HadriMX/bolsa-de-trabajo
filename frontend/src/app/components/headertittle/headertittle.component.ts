import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-headertittle',
  templateUrl: './headertittle.component.html',
  styleUrls: ['./headertittle.component.css']
})
export class HeadertittleComponent implements OnInit {

  public usuarioActual : Usuario;

  constructor(private currentUserService: CurrentUserService, private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    this.usuarioActual = this.currentUserService.getUsuarioActual();
  }

  logout() {
    this.loginService.logout().then(
      response => {
        if (response.success) {
          this.router.navigateByUrl("/login");
        } else {
          Swal.fire('Error en el servidor', response.message, 'error');
        }
      },
      reason => console.log(reason));
  }

}
