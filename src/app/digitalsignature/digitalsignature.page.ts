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
  uploadButtonClicked: boolean = false;
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
name:string="";
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
    this.router.navigate(['/menu']);
}


  onOpenCanvas() {
    this.showCanvas = true;
    this.signatureDataURL = null;
  }
  ngAfterViewInit() {

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
    this.uploadButtonClicked = true;
    if (this.signatureDataURL) {
      const byteCharacters = atob(this.signatureDataURL.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      // const blob = new Blob([byteArray], { type: 'image/png' });
      let file = new File([byteArray],'my_signature_' +'.png',{
        type:'image/png',
        lastModified: new Date().getTime(),
      });
      // Save the Blob and image name
      this.capturedsignatureImageBlob = file;
      this.capturedImageName = `image_${new Date().getTime()}.png`;
      // console.log("blob",blob,"name:",this.capturedImageName );
      console.log(this.capturedsignatureImageBlob)
  
      // Display the saved signature
      const objectURL = URL.createObjectURL(file);
      this.signatureimage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      const toast = await this.toastController.create({
        message:
          'You have saved the signature please submit',
        duration: 3000,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
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
       this.name=res.pkId
      },
      error: (error) => {
        console.error('Error while posting data:', error);
      },
    });
  }


  async onSubmit() {
    const formData = new FormData();
    this.submitButtonDisabled = !this.uploadButtonClicked;
    if (
      this.capturedsignatureImageBlob
    ) {
     
      formData.append('signature1', this.capturedsignatureImageBlob);
      formData.append('name',this.name);
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
  getsignature(){
    this.digitalSignService.getSignature().subscribe(
      (response) => {
       this.name=response==null?'':response.name
       this.loading=false;
      },
      (error) => {
        console.error('Error fetching API data:', error);
        // Handle the error here, e.g., display an error message to the user
      }
    );
  }
  ngOnInit() {
    this.onOpenCanvas();
    this.loading = true;  // Set loading to true while fetching data
  this.getsignature()
console.log(this.username)
    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;

      this.signatureCanvas.nativeElement.addEventListener('touchstart', (event) => this.onTouchStart(event));
      this.signatureCanvas.nativeElement.addEventListener('touchmove', (event) => this.onTouchMove(event));
      this.signatureCanvas.nativeElement.addEventListener('touchend', () => this.onTouchEnd());
    }

  }
}




