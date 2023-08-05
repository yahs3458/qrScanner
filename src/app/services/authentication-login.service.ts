import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationLoginService {
  constructor(private http: HttpClient) {}
  private baseApi = `https://webapi.pciapps.org/api/Account/Login`
  login(username: string, password: string): Observable<boolean> {
    const userData = { username, password };
    return this.http.post<boolean>(this.baseApi, userData);

  }
  // Helper method to validate email format
  // private isValidEmail(email: string): boolean {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
  // forgotPassword(email: string): Observable<boolean> {
  //   // In a real-world scenario, you would make an HTTP request to the server to initiate the password reset process.
  //   // For this demonstration, we will simulate the password reset process by logging a message to the console.
  //   console.log(`Password reset initiated for email: ${email}`);
  //   return of(true); // Return true to indicate that the "Forgot Password" process was successful (for demonstration purposes).
  // }
  
}
