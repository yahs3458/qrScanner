import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';

// import { Modulesenum } from './enums/modulesenum';
// import { SessionStorageService } from './services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Get the token from your storage

    if (token) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent navigation
    }
  }
}