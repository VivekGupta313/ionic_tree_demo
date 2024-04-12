import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';
import {ModalController} from '@ionic/angular';
import { InputModelPage } from '../input-model/input-model.page';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent {

  constructor(public action : ActionSheetController,public router : Router,public active : ActivatedRoute,public alertCntl : AlertController,public dbserve : DatabaseService,public model : ModalController) {
    dbserve.init();
   }
  mainId:any;
  mainCategory:any;
  allMainCat : any;
  subCat:any;
   async ionViewDidEnter(){
    const data = JSON.parse(this.active.snapshot.paramMap.get('id'));
    this.mainCategory = data.NAME;
    this.mainId = data.ID;
    const res = this.getCategory(this.mainId);
    res.then(async result=>{
      this.allMainCat = result;
    })  
  }  
  getCategory(p_id =0){
    return  this.dbserve.getCategories(p_id)
   
  }
  subCategory(id){
    const res =this.getCategory(id)
    res.then(result=>{
      this.subCat = result;
      if(document.getElementById(id).style.display == "block"){
        document.getElementById(id).style.display = "none";
      }else{
        document.getElementById(id).style.display = "block";
      }
    })
    
    
  } 
  openSubCategory(item){

    this.router.navigate(['subCategory/'+JSON.stringify(item)]);
  }
  async addCategory(p_id,categoryName){
   
    const model = await this.model.create({
       component:InputModelPage,
       componentProps:{
         'pid':p_id,
         'categoryName': categoryName
       }
    })
    await model.present()
    await model.onDidDismiss().then(()=>{
      this.ionViewDidEnter();
     })
    //this.ionViewDidEnter();
    // await this.inputService.DisplayAlert(pid);
   }
   async deleteCategory(id){
    const actionSheet = await this.action.create({
      header: 'Detele!',
      subHeader: 'Are you sure! You want to delete ?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler:async()=>{
              this.dbserve.deleteCategory(id);
              this.ionViewDidEnter();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    actionSheet.present();
    
  }   
}
