import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ToastController } from "ionic-angular";

@Injectable()
export class AlertsProvider {

  constructor(public alertCtrl: AlertController, 
  public toastCtrl: ToastController) {}
    
  showAlertMessage(title, message, buttonText) {
    console.log(message);
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [buttonText]
    });
    return alert; 
  }
}