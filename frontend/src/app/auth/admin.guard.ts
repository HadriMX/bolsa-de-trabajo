import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

    constructor(public auth: CurrentUserService, public router: Router) { }

    canActivate(): boolean {
        if (!this.auth.haySesionAdminActiva()) {
            this.router.navigateByUrl('menu');
            return false;
        }
        return true;
    }
}
