import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "./auth.service";

import { Observable, catchError, filter, finalize, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { ExceptionService } from "./exception.service";
import { NotifierService } from "angular-notifier";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    console.log('token from interceptor - ',token)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log('token from interceptor IF - ',token)
    }

    return next.handle(request);
  }
}