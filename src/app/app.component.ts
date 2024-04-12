import { Component } from '@angular/core';
import { DatabaseService } from './service/database.service';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public dbserve: DatabaseService,public plateform : Platform,public loading : LoadingController) {
    this.plateform.ready().then(async ()=>{
       const load = await this.loading.create();
        await load.present();
        await dbserve.init();
        this.dbserve.isReady.subscribe(isReady=>{
          if(isReady){
            load.dismiss();
          }
        })
    })
  }

}
