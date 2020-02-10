import { Component, OnInit, Input } from "@angular/core";
import { CurrentUserService } from "src/app/services/current-user.service";
import { Usuario } from "src/app/models/usuario";
import { AdministradorComponent } from "src/app/components/administrador/administrador.component";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-navbar-admin",
  templateUrl: "./navbar-admin.component.html",
  styleUrls: ["./navbar-admin.component.css"]
})
export class NavbarAdminComponent implements OnInit {
  public usuarioActual: Usuario;

  constructor(
    private currentUserService: CurrentUserService,
    private admin: AdministradorComponent,
    private router: Router,
    private loginService :LoginService
  ) {}

  ngOnInit() {
    this.usuarioActual = this.currentUserService.getUsuarioActual();
  }


  estado(numero: number) {
    this.router.navigateByUrl("/administracion");
    this.admin.estado = numero;
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
