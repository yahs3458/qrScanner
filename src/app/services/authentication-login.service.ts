import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  login(username: string, password: string): Observable<boolean> {
    if (this.isValidEmail(username) && password === 'password') {
      const token = this.generateToken(username);
      localStorage.setItem('token', token); 
      return of(true); // Successful login
    } else {
      return of(false); // Invalid credentials
    }
  }private generateToken(username: string): string {
    // In a real-world scenario, you would use a library to sign the token with proper claims on the server-side.
    // For this demonstration, we will simulate a simple token with a username claim.
    const payload = { username };
    const base64Url = btoa(JSON.stringify(payload)); // Convert the payload to base64
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'+ base64Url + '.secret';
  }
  // Helper method to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  forgotPassword(email: string): Observable<boolean> {
    // In a real-world scenario, you would make an HTTP request to the server to initiate the password reset process.
    // For this demonstration, we will simulate the password reset process by logging a message to the console.
    console.log(`Password reset initiated for email: ${email}`);
    return of(true); // Return true to indicate that the "Forgot Password" process was successful (for demonstration purposes).
  }
  constructor() { }
}
