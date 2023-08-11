import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared/service/auth.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  username: string | null = null;

  constructor(private router: Router ,private route: ActivatedRoute, private authService: AuthService,) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];
  }
 
  goToDigitalSignaturePage() {
    // Pass the username as a query parameter
    this.router.navigate(['/digitalsignature'], { queryParams: { username: this.username } });
  }
  getBootInfo() {
    this.authService.getBootInfo().subscribe({
      next: (res) => {
        this.set_Cache(res);
       

      },
      error: (res) => {
        console.error('Error fetching boot info:');
    
      }
    })
  }
  
  set_Cache(boot: any) {
    localStorage['bootInfo'] = JSON.stringify(boot)
    localStorage.setItem("userName", boot['user'].name);
  

    this.authService.getuserName();
    this.authService.getUserFname();


  }
}


