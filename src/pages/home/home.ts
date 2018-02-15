import { Component } from '@angular/core';
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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

     
    this.dishesProvider.getAllDishes().then(data => {
      this.dishes = data; 
    })

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
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
    let dishesModal = this.modalCtr.create('dishesModal', { test: "testing" }); 
    dishesModal.present(); 
  }
}