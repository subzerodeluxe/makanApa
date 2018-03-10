import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({
  name: 'action' 
})
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {

  constructor(public platform: Platform, public screenOrientation: ScreenOrientation) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    console.log("Action page constructor message"); 
  }
  
  ionViewDidLoad() {
    console.log('Action page DID load'); 
  }
  ionViewWillLoad() {
    console.log("Action page WILL load"); 
    // check if there are dishes --> so wheel can be shown || or show the dishes-form 
  }

}
