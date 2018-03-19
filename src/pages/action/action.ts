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

  showWheel: boolean = false;
  dishesPresent: boolean = false; 
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
    this.checkForDishes();
    // this.dishesProvider.getAllDishes()
    //   .then(data => {
    //     if(data === null) {
    //       console.log("No dishes yet - actionPage ionViewWillLoad");
    //       this.dishesProvider.initializeDishList(this.initialDishList)
    //         .then(data => {
    //           console.log("Succesfully placed data in local storage"); 
    //         })
    //     } else {
    //       console.log("There are dishes! - actionPage ionViewWillLoad");
    //     }
    //   })
  }

  ionViewDidLoad() {
    if(this.dishesPresent === false) {
      this.dishesProvider.initializeDishList(this.initialDishList)
        .then(() => console.log("Succesfully placed data in local storage")); 
    }
  }

  checkForDishes() {
    this.dishesProvider.getAllDishes()
      .then(data => {
        if(data === null) {
          this.dishesPresent = false; 
        } else {
          this.dishesPresent = true; 
          console.log("There are dishes present!"); 
        }
      })
  }

  checkBlocks($event) {
    console.log($event); 
    if($event === true) {
      this.showWheel = true; 
    }
  }
}