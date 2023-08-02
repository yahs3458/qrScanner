import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDitailsPageRoutingModule } from './user-ditails-routing.module';

import { UserDitailsPage } from './user-ditails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDitailsPageRoutingModule
  ],
  declarations: [UserDitailsPage]
})
export class UserDitailsPageModule {}
