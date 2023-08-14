import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

import { catchError, filter, finalize, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { ExceptionService } from "./exception.service";
import { NotifierService } from "angular-notifier";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  TOKEN_HEADER_KEY: string = 'Authorization';
  private isRefreshing = false;
  constructor(private authService: AuthService,
    private inject: Injector,
  ) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.isLoggedIn && !req.url.includes("api/Account/Login")
    ) {
      if (!this.isRefreshing)
        return this.handle401Error2(req, next);
    }

    // this.loaderService.show();

    const authToken = this.authService.getToken() || '';
    let authRequest = req;
    authRequest = this.addTokenHeader(req, authToken);
    return next.handle(authRequest).pipe(

      finalize(() => {
        // this.loaderService.hide();
      }
      )
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(this.TOKEN_HEADER_KEY, "Bearer " + token) });
  }
  private handle401Error2(request: HttpRequest<any>, next: HttpHandler) {
    var Authservice = this.inject.get(AuthenticationService);
    this.isRefreshing = true;
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
}