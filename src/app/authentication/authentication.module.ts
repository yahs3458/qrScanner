import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { ExceptionService } from 'src/shared/service/exception.service';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AuthenticationRoutingModule,
    IonicModule.forRoot(),
  

    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      }
    }),
    HttpClientModule ,
    NotifierModule,
   
  
  ],
 
  providers:[{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ,AuthenticationService,ExceptionService]
})
export class AuthenticationModule { }
