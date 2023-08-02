import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalSignPage } from './digital-sign.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalSignPageRoutingModule {}
