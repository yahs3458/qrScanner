import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';
import { AuthenticationService } from 'src/shared/service/authentication.service';
import { ExceptionService } from 'src/shared/service/exception.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   IonicModule,
    LogInPageRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule
    
  ],
  declarations: [LogInPage],
  providers:[AuthenticationService,ExceptionService]
})

export class LogInPageModule {}
