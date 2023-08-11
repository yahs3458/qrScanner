import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';

// import { Modulesenum } from './enums/modulesenum';
// import { SessionStorageService } from './services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  Istrue: boolean = true;
  constructor(private router: Router,
    private authService: AuthService, ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
    //   let letMenu = this.sessionStorage.getJsonParseValue(AdminConstants.LEFT_MENU_LOCAL_Storage_Key)
      let urlName = state.url.split('/')[2].toLocaleLowerCase();
   
      
    //   if (values.includes(urlName as unknown as Modulesenum)) {
    //     if (letMenu != undefined && letMenu != null) {
    //       let resLeftMenu = letMenu.allowedWorkspaces.filter(x => x.name.toLocaleLowerCase() == urlName);
    //       if (resLeftMenu.length == 0)
    //         this.Istrue = false;
    //     }
    //   }
    }


    return this.Istrue;


  }
}