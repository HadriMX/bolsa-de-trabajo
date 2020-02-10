import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService {

    constructor(private currentUserService: CurrentUserService,
        private cookies: CookieService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var modifiedReq = request.clone({ url: this.currentUserService.agregarPhpsessidEnUrl(request.url) });

        return next.handle(modifiedReq).pipe(catchError(err => {
            if (err.status === 401) {
                this.cookies.delete(this.currentUserService.CURRENT_USER_COOKIE);
                this.router.navigateByUrl("/login");
            }

            const error = err.message || err.statusText;
            return throwError(error);
        }));
    }
}
