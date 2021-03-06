import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from './current-user.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api_response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpointUrl = environment.hostUrl + 'upload_file.php';

  constructor(private http: HttpClient, private currentUserService: CurrentUserService) { }

  uploadFile(name: string, formData: FormData, noReplace = false): Observable<ApiResponse<any>> {
    let url = this.endpointUrl + "?phpsessid=" + this.currentUserService.getPhpsessid();
    url += "&rename=" + name;
    url += "&no_replace=" + noReplace;

    return this.http.post<ApiResponse<any>>(url, formData);
  }

}