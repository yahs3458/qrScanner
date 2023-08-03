import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalsignaturePageRoutingModule } from './digitalsignature-routing.module';

import { DigitalsignaturePage } from './digitalsignature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalsignaturePageRoutingModule
  ],
  declarations: [DigitalsignaturePage]
})
export class DigitalsignaturePageModule {}
