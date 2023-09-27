import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SettingsService } from './settings.service';
import { UserInfoPage } from 'src/app/user-info/user-info.page';

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {
    bootinfo: any = {}
    constructor(private authServices: AuthenticationService,  private route: Router,
         private settingsService:SettingsService
    ) {
  
    }
    login(loginForm: any) {
      return this.authServices.userlogin(loginForm).pipe(
        tap((response: any) => {
          localStorage.setItem("access_token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken); 
        })
      )
    } 
    getBootInfo() {
      return this.settingsService.getBootInfo().pipe()
    }
   
  
    // get isLoggedIn(): boolean {
    //   let authToken = localStorage.getItem('access_token');
    //   return authToken !== null ? true : false;
    //   const token = localStorage.getItem("access_token");
    //   // && !this.jwtHelper.isTokenExpired(token) 
    //   if (token && !this.jwtHelper.isTokenExpired(token)) {
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // }
  
    getUserFname(): any {
      let userData = localStorage.getItem('firstName');
      return userData !== null ? userData : null;
    }
    get getRefreshToken(): any {
      let refreshToken = localStorage.getItem('refreshToken');
      return refreshToken !== null ? refreshToken : null;
    }
  
    getuserName(): string {
      let userData = localStorage.getItem('userName');
      return userData !== null ? userData.toString() : "";
    }
    getToken() {
      return localStorage.getItem('access_token');
    }
    public saveToken(token: string): void {
      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', token);
      // localStorage.removeItem('refreshToken');
      // localStorage.setItem('refreshToken', token);    
    }
    doLogout() {
      localStorage.clear();
      this.route.navigate(['login']);
    }
   
  }
  