import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';

@IonicPage({
  name: 'action' 
})
@Component({
  selector: 'page-action',
  templateUrl: 'action.html',
})
export class ActionPage {

  public initialDishList: Dish[] = [
    { name: "Sop", active: true }, 
    { name: "Stamppot Andijvie", active: true },
    { name: "Nasi Goreng", active: true },
    { name: "...", active: false },
    { name: "...", active: false }];

  constructor(public platform: Platform, public dishesProvider: DishesProvider, public screenOrientation: ScreenOrientation) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }
  
  ionViewWillLoad() {
    this.dishesProvider.getAllDishes()
      .then(data => {
        if(data != null) {
          console.log("We have data!")
        } else {
          this.dishesProvider.initializeDishList(this.initialDishList)
            .then(() => console.log("Placed data in local storage"))
        }
      })


    // check if there are dishes --> so wheel can be shown || show the dishes-form 
  }
}