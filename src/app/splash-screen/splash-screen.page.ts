import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage  {


  constructor(private router :Router) { }
  ionViewDidEnter(){
    setTimeout(()=>{
     this.router.navigate(['home'])
    },2000)
  }

 
}
