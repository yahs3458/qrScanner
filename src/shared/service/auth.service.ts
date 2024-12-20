import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SettingsService } from './settings.service';
import { UserInfoPage } from 'src/app/user-info/user-info.page';
import { PushNotifications } from '@capacitor/push-notifications';
@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {
    bootinfo: any = {}
    constructor(private authServices: AuthenticationService,  private route: Router,
        //  private jwtHelper: JwtHelperService,
         private settingsService:SettingsService
    ) {
  
    }
    login(loginForm: any) {
      return this.authServices.userlogin(loginForm).pipe(
        tap((response: any) => {
          localStorage.setItem("access_token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken); 
          localStorage.setItem('sid', response.sid);
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
      let userData = localStorage.getItem('userName');
      const latitude = localStorage.getItem("latitude") ?? '';
      const longitude = localStorage.getItem("longitude") ?? '';
      const locationAtLogin = localStorage.getItem('locationAtLogin');
      let location = "";
      if (latitude && longitude) {
        location = latitude + ":" + longitude;
      }
      if (userData) {
        this.authServices.logOut(userData, location).subscribe({
          next: (res) => {
            PushNotifications.removeAllListeners()
            localStorage.clear();
            sessionStorage.clear();
            if (locationAtLogin) {
              localStorage.setItem('locationAtLogin', locationAtLogin);
            }
            this.route.navigate(['login']);
          }
        });
      } else {
        // Handle the case where userData is null
      }
    }
    
    forceLogout(pid: String) {
      return this.authServices.forceLogout(pid).pipe()
    }
  }
  