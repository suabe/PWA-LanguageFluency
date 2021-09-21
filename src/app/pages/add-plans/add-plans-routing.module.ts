import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlansPage } from './add-plans.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlansPageRoutingModule {}
