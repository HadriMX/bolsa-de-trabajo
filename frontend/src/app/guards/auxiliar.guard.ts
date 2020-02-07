import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CurrentUserService } from "../services/current-user.service";

@Injectable({
  providedIn: "root"
})
export class AuxiliarGuard implements CanActivate {
  constructor(public auth: CurrentUserService, public router: Router) {}

  canActivate(): boolean {
    if (
      this.auth.haySesionAdminActiva() ||
      this.auth.getUsuarioActual().id_tipo_usuario == 100
    )
      return true;

    if (this.auth.getUsuarioActual().id_tipo_usuario == 100)
      this.router.navigateByUrl("/solicitudes");

    if (this.auth.getUsuarioActual().id_tipo_usuario==1){
      this.router.navigateByUrl("menu");
    }

    return false;
  }
}
