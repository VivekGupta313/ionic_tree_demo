import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputModelPage } from './input-model.page';

const routes: Routes = [
  {
    path: '',
    component: InputModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputModelPageRoutingModule {}
