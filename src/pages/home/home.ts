import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DishesProvider } from '../../providers/dishes/dishes';
import { Dish } from '../../models/dish.interface';

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
  dishes: Dish[]; 

  constructor(public navCtrl: NavController, public modalCtr: ModalController, public dishesProvider: DishesProvider) { }

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

  openDishes() {
    const dishesModal = this.modalCtr.create('dishesModal', {
      enterAnimation: 'modal-scale-up-enter',
      leaveAnimation: 'modal-scale-up-leave'
    });
    dishesModal.present(); 
  }
}