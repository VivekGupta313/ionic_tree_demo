import { Component } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { InputModelPage } from '../input-model/input-model.page';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  category: any;
  subCat: any;
  constructor(public action: ActionSheetController, public dbService: DatabaseService, public model: ModalController, public router: Router) {
    dbService.init();
  }
  ionViewDidEnter() {
    const res = this.getCategory();
    res.then(result => {
      this.category = result;
    })
  }
  getCategory(p_id = 0) {
    return this.dbService.getCategories(p_id)

  }
  subCategory(id) {
    const res = this.getCategory(id)
    res.then(result => {
      this.subCat = result;
      if (document.getElementById(id).style.display == "block") {
        document.getElementById(id).style.display = "none";
      } else {
        document.getElementById(id).style.display = "block";
      }
    })


  }
  async addCategory(p_id, categoryName) {

    const model = await this.model.create({
      component: InputModelPage,
      componentProps: {
        'pid': p_id,
        'categoryName': categoryName
      }
    })
    await model.present();
    await model.onDidDismiss().then(() => {
      this.ionViewDidEnter();
    })

  }
  openSubCategory(item) {

    this.router.navigate(['subCategory/' + JSON.stringify(item)]);
  }
  async deleteCategory(id) {
    const actionSheet = await this.action.create({
      header: 'Detele!',
      subHeader: 'Are you sure! You want to delete ?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            this.dbService.deleteCategory(id);
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
