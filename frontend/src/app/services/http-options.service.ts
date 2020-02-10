import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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
