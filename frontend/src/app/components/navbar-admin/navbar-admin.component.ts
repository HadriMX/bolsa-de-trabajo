import { Component, OnInit, Input } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Usuario } from 'src/app/models/usuario';
import { AdministradorComponent} from 'src/app/components/administrador/administrador.component';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  public usuarioActual: Usuario;
  

  constructor(    private currentUserService: CurrentUserService, private admin:AdministradorComponent) { }

  ngOnInit() {
    this.usuarioActual = this.currentUserService.getUsuarioActual();
  }

  numero(numero:number){
    this.admin.estado= numero;
  }

}
