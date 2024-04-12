import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
 import {HttpClientModule} from '@angular/common/http'
import {InputModelPage} from './input-model/input-model.page'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {SubCategoryComponent} from './sub-category/sub-category.component'
@NgModule({
  declarations: [AppComponent,InputModelPage,SubCategoryComponent],
  imports: [BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
     AppRoutingModule,
     FormsModule
    
    ],
    exports:[InputModelPage],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
