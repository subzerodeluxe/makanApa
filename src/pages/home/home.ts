import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ]),
    trigger('fadeInOut', [
      transition(':enter',[ // "void => *"
        style({ opacity: 0}),
        group([
          animate('0.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translate3d(-100%, 0 ,0)', offset: 0}),
            style({ opacity: 0.5, transform: 'translate3d(20%, 0 ,0)', offset: 0.5}),
            style({ opacity: 1, transform: 'translate3d(0, 0 ,0)', offset: 1})
          ])),
          animate('1s .5s ease', style({
            color: '#ff0000'
          }))
        ])
      ]),
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
export class HomePage {
  
  show: boolean = true;
  visibleState = 'visible';
  startTime = null;
  endTime = null;

  constructor(public navCtrl: NavController) {

  }

  toggleVisible() {
    this.show = !this.show;
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  }

  animationStarted(ev) {
    this.startTime = new Date();
  }

  animationFinished(ev) {
    this.endTime = new Date();
  }

}
