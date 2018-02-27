import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage({
  name: 'welcome'
})

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
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
export class WelcomePage {

  show: boolean = true;
  
  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, public navParams: NavParams) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.startAnimate();
      //this.skipPage();
    }, 3000); 
  }

  startAnimate() {
    this.show = !this.show;
    setTimeout(() => {
      this.skipPage();
    }, 650);
  }

  skipPage() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      androiddelay: 50
     };
 
    this.nativePageTransitions.slide(options);
    this.navCtrl.setRoot('home'); 
  }

}
