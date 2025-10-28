import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit {
  
  constructor(private platform: Platform) {}
  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      const url = window.location.pathname;
      if (url === '/splash-screen') { // Replace '/first-page' with your first page URL
        this.exitApp();
      }
    });
  }
  private exitApp() {
    if ('app' in navigator) {
      const navigatorAny = navigator as any;
      if (navigatorAny.app && navigatorAny.app.exitApp) {
        navigatorAny.app.exitApp();
      } else {
        console.log('Could not close the app');
        // Consider other fallback methods for app closure on Android
      }
    } else if ((navigator as any).close) {
      (navigator as any).close();
    } else {
      console.log('Could not close the app');
      // Consider other fallback methods for app closure on Android
    }
  }
}