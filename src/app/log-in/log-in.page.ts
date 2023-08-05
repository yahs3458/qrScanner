import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthenticationLoginService } from '../services/authentication-login.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,  private authService:AuthenticationLoginService  ) {}

  private jwtHelper: JwtHelperService = new JwtHelperService();
  signature: string | null = null;
  username!: string;
  password!: string;
  showPassword: boolean | undefined;
  invalidCredentials: boolean = false;

  ngOnInit() {
    this.password = '';
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || null;
      if (this.route.snapshot.queryParams['reload']) {
        this.signature = null;
      }
    });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public isFormValid(): boolean {
    return this.validateEmail(this.username) && this.validatePasswordLength(this.password);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePasswordLength(password: string): boolean {
    return password.length >= 4;
  }

  onLogin() {
    if (!this.isFormValid()) {
      // Show an error message or handle form validation here
      return;
    } this.authService.login(this.username, this.password).subscribe((result) => {
      if (result === true) {
        this.invalidCredentials = false;

        // Check if the token is valid
        const token = localStorage.getItem('token');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          // Successful login
          this.router.navigate(['/menu'], { queryParams: { username: this.username } });
        } else {
          // Invalid token or token expired, handle as needed
        }
      } else {
        // Invalid credentials
        this.invalidCredentials = true;
      }
    });
  
}

  ionViewWillEnter() {
    this.username = this.route.snapshot.queryParams['username'];
  }
  onForgotPasswordClick() {
    this.authService.forgotPassword(this.username).subscribe((result) => {
      if (result === true) {
        // For demonstration purposes, we are assuming that the "Forgot Password" process was successful.
        console.log(`Password reset link sent to email: ${this.username}`);
        // You can display a success message to the user or navigate to a "Password Reset" page.
        // For example:
        // this.router.navigate(['/password-reset'], { queryParams: { email: this.username } });
      } else {
        // Handle the case when the "Forgot Password" process failed (for demonstration purposes).
        console.log('Password reset failed. Please try again.');
      }
    });
}
}

