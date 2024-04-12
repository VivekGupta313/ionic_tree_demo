
import { Injectable } from '@angular/core';
import {CapacitorSQLite ,SQLiteConnection, SQLiteDBConnection }from '@capacitor-community/sqlite';

import {Platform} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject,from,of} from 'rxjs';
;
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  isReady = new BehaviorSubject(false);
  db: SQLiteDBConnection
  constructor(private alertCntrl : AlertController,private plateform : Platform) { }
 
  async init(){
        if(this.plateform.is('android')){
          this.getConnection();
        //  this.getData();
    }else{
      const alert = await this.alertCntrl.create({
        header:'Sorry For Inconvinience!',
        message:'Something went wrong, please reopen the app',
        buttons:['OK']
      });
      await alert.present();  
    }
  }
  
  async getConnection (){
    try {
      //getting connection ready.
      const sqlite : SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.checkConnectionsConsistency() 
      const isConn = (await sqlite.isConnection('category', false)).result;
    if (ret.result && isConn) {
      this.db = await sqlite.retrieveConnection("category", false)
    } else {
      this.db = await sqlite.createConnection("category", false, 'no-encryption', 1, false)
    }
    await this.db.open()
    this.db.isDBOpen().then(async res=>{
      this.getData();
    })
      
    } catch (error) {
      const alert = await this.alertCntrl.create({
        header:'Error',
        message:'Error : '+error.message,
        buttons:['OK']
      });
      await alert.present();  
    }
    
  }
  async getData(update = false){
    if(!this.db.isDBOpen()){
      this.getConnection();
    }
    const sql = "CREATE TABLE IF NOT EXISTS CATEGORY (ID INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL,PID INTEGER NOT NULL)";
    const res = await this.db.query(sql);    
    this.isReady.next(true);
  }
  async getCategories(id =0){
    if(!this.isReady){
      return of({values:[]});
    }else{
      const query = "SELECT * FROM category WHERE PID = "+id;
      let res = await this.db.query(query)
      return res.values;
    }
  }
  async addCategory(data){
      const query = "INSERT INTO CATEGORY (NAME,PID) VALUES('"+data.name+"','"+data.pid+"')"; 
      return await this.db.query(query);
    
}
async deleteCategory(id){
  const query = "DELETE FROM category WHERE ID = "+id + " OR PID = "+id;      
  return await (await this.db.query(query)).values;
}
}

