import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { NotifierModule } from 'angular-notifier';
import { AuthService } from 'src/shared/service/auth.service';
import { AuthInterceptor } from 'src/shared/service/auth-interceptor';
import { LogInPageModule } from './log-in/log-in.module';

import { ReactiveFormsModule } from '@angular/forms';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      }
    }),
    HttpClientModule ,
    NotifierModule,
    LogInPageModule,
    ReactiveFormsModule,
    IonicModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
