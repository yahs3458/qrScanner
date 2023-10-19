import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared/service/auth.service';
import { BootinfoService } from 'src/shared/service/bootinfo.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  username: string | null = null;
  user: string | null = null;
  constructor(    private bootInfoService: BootinfoService,   private auth:AuthService,private router: Router ,private route: ActivatedRoute, private authService: AuthService,) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];
    let v = this.bootInfoService.getBootInfoFromLocalStorage();
    this.user = v.user.full_name;
  }
 
  goToDigitalSignaturePage() {
    // Pass the username as a query parameter
    this.router.navigate(['/digitalsignature'], { queryParams: { username: this.username } });
  }
 
  
  set_Cache(boot: any) {
    localStorage['bootInfo'] = JSON.stringify(boot)
    localStorage.setItem("userName", boot['user'].name);
  

    this.authService.getuserName();
    this.authService.getUserFname();


  }
  navigate(index: number) {switch (index) {
   
      case 1:
        this.router.navigate(['/user-info']);
        break;
      }
    }
    logout() {
      this.auth.doLogout();
    }

  }
