import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Routes , RouterModule} from '@angular/router'
import { IonicModule } from '@ionic/angular';

import { InputModelPageRoutingModule } from './input-model-routing.module';

import { InputModelPage } from './input-model.page';
const routes: Routes = [  
  {  
    path: '',  
    component: InputModelPage  
  }  
];  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModelPageRoutingModule,
    RouterModule.forChild(routes)  
  ],
  declarations: [InputModelPage]
})
export class InputModelPageModule {}
