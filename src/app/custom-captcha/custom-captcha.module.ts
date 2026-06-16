import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { AuthenticationService } from 'src/shared/service/authentication.service';
import { ExceptionService } from 'src/shared/service/exception.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomCaptchaComponent } from './custom-captcha.component';


@NgModule({
  declarations: [CustomCaptchaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [CustomCaptchaComponent] // ⭐ REQUIRED
})
export class CustomCaptchaModule {}
