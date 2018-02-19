import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';

@IonicPage({
  name: 'dishesModal'
})
@Component({
  selector: 'dishes-modal',
  templateUrl: 'dishes-modal.html'
})
export class DishesModalComponent {
  
  highLighted: number; 
  preDishList: Dish[]; 
  dishes: Dish[];
  showNoDishesWarning: boolean = false; 
  showCheckmark: boolean = false; 
  timeout = null;
  enteredDish: string;
  showInput: boolean = false;
  showDish: boolean = true; 

  constructor(public platform: Platform, public dishesProvider: DishesProvider, public screenOrientation: ScreenOrientation, 
    public viewCtrl: ViewController) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  ionViewWillLoad() {
    this.preDishList = [
      { name: "Sop", active: true }, 
      { name: "Stamppot Andijvie", active: true },
      { name: "Nasi Goreng", active: true },
      { name: "...", active: false },
      { name: "...", active: false }];

    this.dishesProvider.initializeDishList(this.preDishList).then(dishes => {
      console.log("DE DISHES: " + JSON.stringify(dishes));
      this.dishes = dishes; 
    })
  }

  ionViewDidLoad() {
    this.showAllDishes();
    setTimeout(() => {
      //this.checkBlocksForActive(this.dishes);
      this.checkIfBlocksAreActive(this.dishes); 
    }, 800); 
    
  }

  addDish(dish) {
    let index = this.dishes.indexOf(dish);
    let updatedDish = { name: this.enteredDish, active: true };
    console.log("Index of dish: " + index + " New dishObject " + JSON.stringify(updatedDish));
    
    if(index >= -1) {
      this.dishesProvider.addDish(updatedDish, index).then((data) => {
        console.log("UPDATED LIST " + JSON.stringify(data)); 
        this.highLighted = null;
        this.showAllDishes();
        this.enteredDish = "..."; 
      })
    } else {
      this.showNoDishesWarning = true;
      console.log("JA DIT GAAT HELEMAAL FOUT"); 
    }
  }

  checkIfBlocksAreActive(dishesArray) {
    let allActive;

    for (let index = 0; index < dishesArray.length;) {
      const dish = dishesArray[index];
      if(dish.active === true) {
        //console.log("True: " + JSON.stringify(dish.active));
        index++; 
        //return allActive = true; 
      }
    }

    dishesArray.forEach(dish => {
      console.log("All dishes " + dish); 
    });

  }

  showAllDishes() {
    this.dishesProvider.getAllDishes().then(dishes => {
      if(dishes === null) {
        this.showNoDishesWarning = true;
      } else {
        this.dishes = dishes; 
      }
    }).catch(error => {
      this.showNoDishesWarning = true;
      console.log("Something went wrong: " + error); 
    })
  }

  checkInput(input, dish) {
    console.log("De tekst: " + input.value);
    console.log("Oorspronkelijke dish: " + dish.name)
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(input.value.length >= 1) {
        this.showCheckmark = true;
      } else {
        this.showCheckmark = false; 
      }
    }, 300); 
  }

  openInputField(index) {
    this.highLighted = index;
  }


  closeMenuModal() {
    console.log("The modal is closed!"); 
    this.viewCtrl.dismiss();
  }


} 
