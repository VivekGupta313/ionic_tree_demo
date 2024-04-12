import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {DatabaseService} from '../service/database.service'
import {ToastController} from '@ionic/angular'
import {NavParams} from '@ionic/angular'
@Component({
  selector: 'app-input-model',
  templateUrl: './input-model.page.html',
  styleUrls: ['./input-model.page.scss'],
})
export class InputModelPage implements OnInit {

  constructor(public model : ModalController,public dbServe : DatabaseService,public toast : ToastController,public nav : NavParams) { }
   name : String ;
   count:any;
   categoryName :String;
   pid:number;
  ngOnInit() {
    this.pid = this.nav.get('pid');
    this.categoryName  = this.nav.get('categoryName');
  }
  cancel(){
    this.model.dismiss();
  }
  async submit(){
    if(this.name ==undefined){
      this.name="";
      console.log("please Enter Category")
      
      }else{
        let data = {
          'name':this.name,
          'pid':this.pid
        }
      const res = await this.dbServe.addCategory(data);
     if(res){
        const toast = await this.toast.create({
          message:"Category " +this.name + " inserted successfull",
          duration:3000,
          color: "success",
        });
        await toast.present();
      this.cancel();        
     }
     
    }

  }

}
