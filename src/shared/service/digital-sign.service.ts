import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigitalSignService {
  APIGetUrl = 'InstituteDeclaration/get_instituteDeclaration';
  APIBaseUrl: string | undefined;
  APIurl = 'InstituteDeclaration/updateSignature'
    constructor(private http:HttpClient) {
      this.APIBaseUrl =environment.API_BASE_URL;
     }
  
     getSignature(url: string) : Observable<any> {
      return this.http.get(this.APIBaseUrl + this.APIGetUrl );
    }
  
     postSignature(signatureData: any): Observable<any> {
      const url = `${this.APIBaseUrl}${this.APIurl}`;
      return this.http.post(url, signatureData);
    }
}
