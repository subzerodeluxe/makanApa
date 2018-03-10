import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@IonicPage({
  name: 'welcomePage'
})

@Component({
  selector: 'page-welcome-splash',
  templateUrl: 'welcome-splash.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave',[ // "* => void"
        animate('0.6s ease-out', keyframes([
          style({ opacity: 1, transform: 'translate3d(0, 0 ,0)', offset: 0}),
          style({ opacity: 0.5, transform: 'translate3d(-20%, 0 ,0)', offset: 0.7}),
          style({ opacity: 0, transform: 'translate3d(100%, 0 ,0)', offset: 1})
          ]))
        ])
      ])
    ]
})
export class WelcomeSplashPage {

  show: boolean = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.startAnimate();
      //this.skipPage();
    }, 3000); 

    console.log("Good. The new welcome-splash is working");
  }

  startAnimate() {
    this.show = !this.show;
    setTimeout(() => {
      this.skipPage();
    }, 650);
  }

  skipPage() {
    this.navCtrl.setRoot('home'); 
  }

}
