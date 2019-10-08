import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(public auth: CurrentUserService, public router: Router) { }

    canActivate(): boolean {
        if (this.auth.haySesionActiva()) {
            this.router.navigateByUrl('menu');
            return false;
        }
        return true;
    }
}
