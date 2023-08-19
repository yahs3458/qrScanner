import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigitalSignService {
APIBaseUrl: string | undefined;
APIurl = 'InstituteDeclaration/add_digitalSign'
  constructor(private http:HttpClient) {
    this.APIBaseUrl =environment.API_BASE_URL;
   }

   postSignature(signatureData: any): Observable<any> {
    const url = `${this.APIBaseUrl}${this.APIurl}`;
    return this.http.post(url, signatureData);
  }
}
