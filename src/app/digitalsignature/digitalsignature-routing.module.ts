import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalsignaturePage } from './digitalsignature.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalsignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalsignaturePageRoutingModule {}
