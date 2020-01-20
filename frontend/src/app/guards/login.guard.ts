import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(public auth: CurrentUserService, public router: Router) { }

    canActivate(): boolean {
        if (!this.auth.haySesionActiva())
            return true;
        
        if (this.auth.getUsuarioActual().id_tipo_usuario == 2)
            this.router.navigateByUrl("/vacantes");
        else
            this.router.navigateByUrl("/menu");
        
        return false;
    }
}
