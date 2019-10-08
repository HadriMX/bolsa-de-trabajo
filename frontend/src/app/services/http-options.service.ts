import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  public headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}
