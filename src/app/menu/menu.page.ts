import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  username: string | null = null;

  constructor(private router: Router ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];
  }
 
  goToDigitalSignaturePage() {
    // Pass the username as a query parameter
    this.router.navigate(['/digitalsignature'], { queryParams: { username: this.username } });
  }
}

