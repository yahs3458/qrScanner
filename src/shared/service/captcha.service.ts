import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

 APIBaseUrl: string;
   APIGetUrl ='Common/get_newCaptcha'
  
 
   constructor(private http: HttpClient) {
     this.APIBaseUrl = environment.API_BASE_URL;
   }
   get_newCaptcha(): Observable<any> {
     return this.http.get(this.APIBaseUrl + this.APIGetUrl);
   }
 
}
