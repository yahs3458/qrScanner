import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './service/auth.service';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from './service/authentication.service';
import { ExceptionService } from './service/exception.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  TOKEN_HEADER_KEY: string = 'Authorization';
  private isRefreshing = false;
  constructor(private authService: AuthService, 
     private inject: Injector,
    private notifier: NotifierService,private exceptionService:ExceptionService, private authenticationService: AuthenticationService) { }
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
    //   this.loaderService.show();
      if ([401, 403].includes(err.status) && !request.url.includes("api/Account/Login")
        ) {
        return this.handle401Error2(request, next);
      }
      else if ([501, 500].includes(err.status) && err.error.message != 'Unauthorized Access!!!') {
        this.exceptionService.handleError(err);
      }
      else if (err.error.message == 'Unauthorized Access!!!') {
        return this.handle401Error2(request, next);
      }
      else if ([0].includes(err.status)) {
        this.notifier.notify("error", "There is a network issue, please reload or try again after sometime.");
      }

      finalize(() => {
        // this.loaderService.hide();
      });
      return throwError(err);

    }))
  }

  private handle401Error2(request: HttpRequest<any>, next: HttpHandler) {
    var Authservice = this.inject.get(AuthenticationService);
    return Authservice.refreshToken().pipe(
      switchMap((data: any) => {
        this.authService.saveToken(data.token);
        // this.loaderService.hide();
        return next.handle(this.addTokenHeader(request, data.token));
      }),
      catchError((err) => {
        this.isRefreshing = false;
        // this.loaderService.hide();
        this.authService.doLogout();
        return throwError(err);
      })
    );

  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(this.TOKEN_HEADER_KEY, "Bearer " + token) });
  }
}



