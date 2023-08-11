import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './service/authentication.service';
import { ExceptionService } from './service/exception.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[AuthenticationService,ExceptionService]
})
export class SharedModule { }
