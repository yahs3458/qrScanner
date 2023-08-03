import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  }
  //for android event 
  
  onTouchStart(event: TouchEvent) {
    this.isDrawing = true;
    this.lastX = event.touches[0].clientX;
    this.lastY = event.touches[0].clientY;
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

          // Update signatureDataURL when drawing
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
    this.ctx = (this.signatureCanvas?.nativeElement.getContext('2d') as CanvasRenderingContext2D); // Use the non-null assertion operator !
  }
  startDrawing(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    const canvas = this.signatureCanvas?.nativeElement;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'clientX' in event ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
      const clientY = 'clientY' in event ? (event as MouseEvent).clientY : (event as TouchEvent).touches[0].clientY;
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
      const clientX = 'clientX' in event ? (event as MouseEvent).clientX : (event as TouchEvent).touches[0].clientX;
      const clientY = 'clientY' in event ? (event as MouseEvent).clientY : (event as TouchEvent).touches[0].clientY;
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
    this.signatureDataURL = null;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.signatureCanvas!.nativeElement.width, this.signatureCanvas!.nativeElement.height);
    }
  }
}




