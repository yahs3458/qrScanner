import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  constructor(private router : Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.password = '';
  }

  username!: string;
  password!: string;
  showPassword: boolean | undefined;

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

  ionViewWillEnter() {
    // Retrieve the username from the query parameter
    this.username = this.route.snapshot.queryParams['username'];
  }

  onLogin() {
    if (!this.isFormValid()) {
      // Show an error message or handle form validation here
      return;
    }

    console.log('Logging in...');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(['/menu'], { queryParams: { username: this.username } });
  }
}


