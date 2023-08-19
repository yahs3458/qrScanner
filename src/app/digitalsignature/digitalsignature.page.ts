import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalSignService } from 'src/shared/service/digital-sign.service';
import { ToastController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-digitalsignature',
  templateUrl: './digitalsignature.page.html',
  styleUrls: ['./digitalsignature.page.scss'],
})
export class DigitalsignaturePage implements OnInit {
  username: string | null = null;
  showCanvas: boolean = false;
  saveButtonClicked = false;
  submitButtonDisabled = true;
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private ctx: CanvasRenderingContext2D | any;
  private isDrawing: boolean = false;
  public signatureDataURL: string | null = null;

  private lastX: number = 0;
  private lastY: number = 0;

  constructor(private digitalSignService: DigitalSignService,
     private router: Router, 
     private route: ActivatedRoute
     ,private toastController: ToastController,
     private navCtrl: NavController,
     ) { }

  //for android event 

  onTouchStart(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }
    this.submitButtonDisabled = false;
    this.isDrawing = true;
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      this.lastX = event.touches[0].clientX - rect.left;
      this.lastY = event.touches[0].clientY - rect.top;
    }
  }


  onTouchMove(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }
    if (this.isDrawing) {
      const canvas = this.signatureCanvas?.nativeElement;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(this.lastX, this.lastY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.closePath();

          this.lastX = x;
          this.lastY = y;
          this.signatureDataURL = canvas.toDataURL();
        }
      }
    }
  }

  onTouchEnd() {
    this.isDrawing = false;
    this.submitButtonDisabled = false;
  }



  onOpenCanvas() {
    this.showCanvas = true;
    this.signatureDataURL = null;
  }
  ngAfterViewInit() {
    // Initialize touch event listeners for the signatureCanvas element
    // if (this.renderer && this.signatureCanvas && this.signatureCanvas.nativeElement) {
    //   const canvas = this.signatureCanvas.nativeElement;

    //   // Add touch event listeners using Renderer2
    //   this.renderer.listen(canvas, 'touchstart', (event) => this.onTouchStart(event));
    //   this.renderer.listen(canvas, 'touchmove', (event) => this.onTouchMove(event));
    //   this.renderer.listen(canvas, 'touchend', () => this.onTouchEnd());
    // }
    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

  }

  startDrawing(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    this.submitButtonDisabled = false;
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
      this.lastX = clientX - rect.left;
      this.lastY = clientY - rect.top;
    }
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) {
      return;
    }
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        this.lastX = x;
        this.lastY = y;
        this.signatureDataURL = canvas.toDataURL();
      }
    }
  }

  endDrawing() {
    this.isDrawing = false;
    this.submitButtonDisabled = false;
   
  }


  async onSaveSignature() {

    if (this.signatureDataURL) {
      const signatureData = {
        base64Image: this.signatureDataURL,
        imagename: 'my-signature.png' // Update with the appropriate image name
      };
      console.log('Signature Data:', signatureData);
      

      this.digitalSignService.postSignature(signatureData).subscribe(
        (response) => {
          console.log('Signature saved:', response);
          this.submitButtonDisabled = false; // You can handle success response here
        },
        (error) => {
          console.error('Error saving signature:', error);
          // You can handle error here
        }
      );
    } else {
      console.log('No signature to save.');
    }
    this.saveButtonClicked = true;
    this.submitButtonDisabled = false;

    //submit button functionality 

    if (this.signatureDataURL) {
      // Show success toast
      const toast = await this.toastController.create({
        message: 'Signature submitted successfully!',
        duration: 3000,
        position: 'bottom', // Set the position of the toast
        color: 'success' // Set the color of the toast
      });
      toast.present();
      
      // Navigate to the specified route
      this.navCtrl.navigateForward('/digitalsignature', { queryParams: { reload: true } });
    } else {
      // Show error toast
      const toast = await this.toastController.create({
        message: 'Please provide a signature before submitting.',
        duration: 3000,
        position: 'bottom',
        color: 'danger' // Set the color of the toast
      });
      toast.present();
    }
  
  }


  onResetCanvas() {
    this.signatureDataURL = null;
    this.isDrawing = false;
    this.submitButtonDisabled = true;

    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear the canvas by drawing a white rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset other properties
        this.signatureDataURL = null;
        this.isDrawing = false;
      }

    }

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Handle canvas resizing if required
  }
  navigate(index: number) {switch (index) {
    case 0:
      this.router.navigate(['/menu']);
      break;
      case 1:
        this.router.navigate(['/user-info']);
        break;
      }
    }


  logout() {
   
    this.router.navigate(['/login']); 
  }


  ngOnInit() {
    this.onOpenCanvas();
    this.submitButtonDisabled = true;

    this.username = this.route.snapshot.queryParams['username'];

    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;

      this.signatureCanvas.nativeElement.addEventListener('touchstart', (event) => this.onTouchStart(event));
      this.signatureCanvas.nativeElement.addEventListener('touchmove', (event) => this.onTouchMove(event));
      this.signatureCanvas.nativeElement.addEventListener('touchend', () => this.onTouchEnd());
    }

  }
}




