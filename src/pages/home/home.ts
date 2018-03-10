import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonicPage, NavParams, Platform } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('shake', [
      state('small', style({transform: 'scale(1)'})),
      state('big', style({transform: 'scale(1.1)'})),
      transition('small => big', animate('0.5s linear')),
      transition('big => small', animate('0.5s linear'))
    ])
  ]
})
export class HomePage {
  
  state: string = 'small';

  constructor(public navCtrl: NavController, public platform: Platform, 
    public screenOrientation: ScreenOrientation, public modalCtr: ModalController, public navParams: NavParams) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.state = 'big';
    }, 0);
  }
  
  onEnd(event) {
    this.state = 'small';
    if (event.toState === 'small') {
      setTimeout(() => {
        this.state = 'big';
      }, 0);
    }
  }

  openActionPage() {
    const animationsOptions = {
      animation: 'md-transition',
      duration: 1000
    }
    this.navCtrl.push('action', {}, animationsOptions); 
  }
}