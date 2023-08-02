import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalSignPageRoutingModule } from './digital-sign-routing.module';

import { DigitalSignPage } from './digital-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalSignPageRoutingModule
  ],
  declarations: [DigitalSignPage]
})
export class DigitalSignPageModule {}
