import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalSignService } from 'src/shared/service/digital-sign.service';
import { ToastController, NavController } from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  apiResponse: any;

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private ctx: CanvasRenderingContext2D | any;
  private isDrawing: boolean = false;
  public signatureDataURL: string | null = null;

  private lastX: number = 0;
  private lastY: number = 0;

  constructor(private digitalSignService: DigitalSignService,
     private toastController: ToastController,
     private router: Router,
     private sanitizer:DomSanitizer,
    
     ) { }
     capturedsignatureImageBlob: Blob | null = null;
     signatureimage: SafeUrl | null = null;
     loading: boolean = false;
     capturedImageName: string | null = null;

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
  navigate(ind: number) {
    this.router.navigate(['/dashboard']);
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


  onSaveSignature() {
    if (this.signatureDataURL) {
      const byteString = atob(this.signatureDataURL.split(',')[1]);
      const buffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(buffer);
  
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
  
      const blob = new Blob([buffer], { type: 'image/jpeg' });
  
      // Save the Blob and image name
      this.capturedsignatureImageBlob = blob;
      this.capturedImageName = 'signature.jpeg';
      console.log(this.capturedsignatureImageBlob)
  
      // Display the saved signature
      const objectURL = URL.createObjectURL(blob);
      this.signatureimage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      console.log('No signature to save.');
    }
  
    this.saveButtonClicked = true;
    this.submitButtonDisabled = false;
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
  postSignature(data: FormData) {

    this.digitalSignService.postSignature(data).subscribe({
      next: (res) => {
        console.log('Response from server:', res);
       
      },
      error: (error) => {
        console.error('Error while posting data:', error);
      },
    });
  }


  async onSubmit() {
   
    if (
      this.capturedsignatureImageBlob
    ) {
      const formData = new FormData();
      
      formData.append('signature', this.capturedsignatureImageBlob);
     

      // Log the data before making the HTTP request
      console.log('Data to be submitted:', formData);

      this.postSignature(formData);

      const toast = await this.toastController.create({
        message: 'Data submitted successfully!',
        duration: 3000,
        position: 'bottom',
        color: 'dark',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message:
          'Please provide an image, a signature, and a declaration text before submitting.',
        duration: 3000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
  displaySignature() {
    if (this.apiResponse && this.apiResponse.signature1) {
      // Assuming this.apiResponse.signature1 contains the URL of the signature image
      // Set the signature image to be displayed
      this.signatureimage = this.sanitizer.bypassSecurityTrustUrl(this.apiResponse.signature1);
    }
  }


  ngOnInit() {
    // this.ionLoaderService.autoLoader();

    this.onOpenCanvas();
    this.loading = true;  // Set loading to true while fetching data
    this.digitalSignService.getSignature('name').subscribe(
      (response) => {
        this.apiResponse = response;
        this.displaySignature();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching API data:', error);
        // Handle the error here, e.g., display an error message to the user
      }
    );
    
  

    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;

      this.signatureCanvas.nativeElement.addEventListener('touchstart', (event) => this.onTouchStart(event));
      this.signatureCanvas.nativeElement.addEventListener('touchmove', (event) => this.onTouchMove(event));
      this.signatureCanvas.nativeElement.addEventListener('touchend', () => this.onTouchEnd());
    }

  }
}




