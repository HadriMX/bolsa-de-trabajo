import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpOptionsService } from './http-options.service';
import { CurrentUserService } from './current-user.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpointUrl = 'http://localhost/bdt/php/src/upload_file.php';

  constructor(private http: HttpClient,
    private currentUserService: CurrentUserService) { }

  uploadFile(name: string, formData: FormData, noReplace = false): Observable<ApiResponse<any>> {
    let url = this.endpointUrl + "?phpsessid=" + this.currentUserService.getPhpsessid();
    url += "&rename=" + name;
    url += "&no_replace=" + noReplace;

    return this.http.post<ApiResponse<any>>(url, formData);
  }
}
