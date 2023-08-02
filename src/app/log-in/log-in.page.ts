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
  }
  username!: string;
  password!: string;
  showPassword: boolean | undefined;


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ionViewWillEnter() {
    // Retrieve the username from the query parameter
    this.username = this.route.snapshot.queryParams['username'];
  }
 
  onLogin(){
    console.log('Logging in...');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.router.navigate(['/pendingDashboard']);
  }
}


