import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'welcome'
})

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    setTimeout(() => {
      this.skipPage()
    }, 5000)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  skipPage() {
    this.navCtrl.setRoot('home'); 
  }

}
