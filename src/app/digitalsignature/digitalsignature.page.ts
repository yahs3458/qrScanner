import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-digitalsignature',
  templateUrl: './digitalsignature.page.html',
  styleUrls: ['./digitalsignature.page.scss'],
})
export class DigitalsignaturePage implements OnInit {
  username: string | null = null;
  showCanvas: boolean = false;
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas: ElementRef<HTMLCanvasElement> | undefined;
  private ctx: CanvasRenderingContext2D | undefined;
  private isDrawing: boolean = false;
  public signatureDataURL: string | null = null;

  private lastX: number = 0;
  private lastY: number = 0;

  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.username = this.route.snapshot.queryParams['username'];
    
    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;

      this.signatureCanvas.nativeElement.addEventListener('touchstart', (event) => this.onTouchStart(event));
      this.signatureCanvas.nativeElement.addEventListener('touchmove', (event) => this.onTouchMove(event));
      this.signatureCanvas.nativeElement.addEventListener('touchend', () => this.onTouchEnd());
    }
 
  }
  //for android event 
  
  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.isDrawing = true;
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      this.lastX = event.touches[0].clientX - rect.left;
      this.lastY = event.touches[0].clientY - rect.top;
    }
  }


  onTouchMove(event: TouchEvent) {
    event.preventDefault();
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
    // if (this.ctx) {
    //   this.signatureDataURL = this.signatureCanvas!.nativeElement.toDataURL();
    // }
  }

  
  onSaveSignature() {
    
    if (this.signatureDataURL) {
      // Implement your logic here to save the signature (e.g., send to the server).
      console.log('Signature saved:', this.signatureDataURL);
    } else {
      console.log('No signature to save.');
    }
  }
  onResetCanvas() {
    if (this.signatureCanvas && this.signatureCanvas.nativeElement && this.ctx) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.signatureDataURL = null; // Reset the signature data URL as the canvas is cleared.
      this.isDrawing = false; // Reset the drawing flag to allow the user to draw a new signature.
    }
    this.signatureDataURL = null;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.signatureCanvas!.nativeElement.width, this.signatureCanvas!.nativeElement.height);
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Handle canvas resizing if required
  }
  
  onSubmitSignature() {
    if (this.signatureDataURL) {
      // Implement your logic here to submit the signature, e.g., send to the server.

      // Show an alert message upon successful submission
      alert('Signature submitted successfully!');

      this.router.navigate(['/log-in']).then(() => {
        // After navigation is complete, reload the login page to clear the signature field
        this.router.navigate(['/log-in'], { queryParams: { reload: true } });
      });
      this.router.navigate(['/digitalsignature'], { queryParams: { reload: true } });
    } else {
      // If there is no signature data, show an error message
      alert('Please provide a signature before submitting.');
    }
  }
}




