import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-user-ditails',
  templateUrl: './user-ditails.page.html',
  styleUrls: ['./user-ditails.page.scss'],
})
export class UserDitailsPage implements OnInit {
  username!: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.queryParams['username'];
  }

}
