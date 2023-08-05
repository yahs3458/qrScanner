import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationLoginService } from '../services/authentication-login.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute,  private authService:AuthenticationLoginService  ) {}

 
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

  // public isFormValid(): boolean {
  //   return this.validateEmail(this.username) && this.validatePasswordLength(this.password);
  // }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // private validatePasswordLength(password: string): boolean {
  //   return password.length >= 4;
  // }

  onLogin() {
  
    this.authService.login(this.username,this.password).subscribe((res)=>{
      if(res){
        this.invalidCredentials=false;
        console.log('res -> ',res);
        this.router.navigate(['/menu'], { queryParams: { username: this.username } });
      }else{
        this.invalidCredentials=true;
      }
    })
  
}

  ionViewWillEnter() {
    this.username = this.route.snapshot.queryParams['username'];
  }
  onForgotPasswordClick() {
    // Implement your logic for the "Forgot Password" functionality here
    // For example, you can navigate to a "Forgot Password" page
    // this.router.navigate(['/forgot-password']);
  }
}


