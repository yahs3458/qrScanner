import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/shared/service/auth.service';


interface UserProfile {
 avatar: string;
}
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  public clgData:any;

 username: string | null = null;
  email: string | null = null;
    
  user: UserProfile = {
   
    avatar: 'https://via.placeholder.com/150', 
  };


  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];
    this.clgData = this.displayData();
    console.log(this.clgData.user)
  }


  navigate(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/menu']);
        break;
      
    }
  }

  displayData() {
    var res = localStorage.getItem('bootInfo');
    // return res;
    if (res !== null) {
      var response = JSON.parse(res);
      
      return (response);
    } else {
      return null;
    }
  }
  logout() {

    this.router.navigate(['/login']); // Replace 'login' with your actual login page path
  }

}
