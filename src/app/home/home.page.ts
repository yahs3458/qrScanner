import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scanActive = true;
  scanResult: string | null = null;
  @ViewChild('video', { static: false }) video: ElementRef | undefined;
  @ViewChild('canvas', { static: false }) canvas: ElementRef | undefined;

  constructor(private toastCtrl: ToastController, private loadingCTRL: LoadingController, private plt: Platform , private router: Router) {

    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];


    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('i am an ios PWA!');
    }


  }


  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement | null = null;

  ngAfterViewInit() {
    this.videoElement = this.video?.nativeElement;
    this.canvasElement = this.canvas?.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');

  }
  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true)
    this.videoElement.play();
    this.loading = await this.loadingCTRL.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  };
  async scan() {
    console.log('scan');
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log('code:', code);
      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }



    } else {
      requestAnimationFrame(this.scan.bind(this));
    }

  }

  stopScan() {
    this.scanActive = false;

  };
  reset() {
    this.scanResult = null;
  };
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            if (this.scanResult) {
              window.open(this.scanResult, '_system', 'location=yes');
            }
          },
        }
      ]
    });
    toast.present();
    
    this.router.navigate(['/log-in'], { queryParams: { username: this.scanResult } });
  }
}
