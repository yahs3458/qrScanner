import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { UserAuthRequest } from 'src/app/interface/user-auth-request';
import { apiUrl } from './api-URLs';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    private APIBaseUrl: string
    constructor(private http: HttpClient
    ) {
  
      this.APIBaseUrl = environment.API_BASE_URL;
    }
  
    userlogin(UserAuthRequest: UserAuthRequest): Observable<any> {
      return this.http.post(this.APIBaseUrl + apiUrl.API_AdminLogin_URL, UserAuthRequest,
        {
          headers: this.getHeaders()
        }).pipe();
  
    } 
  
    refreshToken() {
  
      let userName = localStorage.getItem('userName')
      var requestBody = { refreshToken: localStorage.getItem('refreshToken'), userName: userName }
      return this.http.post(this.APIBaseUrl + apiUrl.API_Refresh_Token_URL, requestBody);
    }
  
    getHeaders() {
      let headerOption = new HttpHeaders();
      headerOption.append('Content-Type', 'application/json');
      headerOption.append('X-Requested-With', 'XMLHttpRequest');
      return headerOption;
    }
    // userRegistration(user: any): Observable<any> {
    //   return this.http.post(this.APIBaseUrl + apiUrl.API_User_Registration_URL, user, {
    //     headers: this.getHeaders()
    //   }).pipe();
    // }
  
 
  }
  