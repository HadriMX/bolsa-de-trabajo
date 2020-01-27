import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { retry } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: CurrentUserService, public router: Router) { }

  canActivate(): boolean {
    if (this.auth.haySesionActiva())
      return true;

    this.router.navigateByUrl('login');
    return false;
  }
}
