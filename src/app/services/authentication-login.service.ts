import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginService {

  login(username: string, password: string): Observable<boolean> {
    if (this.isValidEmail(username) && password === 'password') {
      return of(true); // Successful login
    } else {
      return of(false); // Invalid credentials
    }
  }

  // Helper method to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  constructor() { }
}
