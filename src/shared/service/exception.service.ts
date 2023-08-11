import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { throwError } from 'rxjs';

@Injectable()
export class ExceptionService {
  
  constructor(private notifier:NotifierService) { 
    
  }
  handleError(error:any) {
    
    let errorMessage = '';
        
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.error.statusCode}\nMessage: ${error.error.message}`;
    }   
    this.notifier.notify("error",errorMessage); 
   
    return throwError(errorMessage);
 
 }
}
