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


  signature: string | null = null;
  username!: string;
  password!: string;
  showPassword: boolean | undefined;
  ngOnInit() {
    this.password = '';
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || null;
      if (this.route.snapshot.queryParams['reload']) {
        // Reset the signature field here (clear the signature)
        // For example, you can set the signature to an empty string or null.
        // Replace the following line with the logic to reset the signature field as needed.
        this.signature = null;
      }
      // Now you can use the 'username' value as needed in your log-in page
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


