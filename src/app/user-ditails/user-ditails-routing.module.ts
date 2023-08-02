import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDitailsPage } from './user-ditails.page';

const routes: Routes = [
  {
    path: '',
    component: UserDitailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDitailsPageRoutingModule {}
