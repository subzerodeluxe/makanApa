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

  preDishList: Dish[]; 
  dishes: Dish[];
  showInput: boolean = false;
  showDish: boolean = true;
  showNoDishesWarning: boolean = false; 
  showCheckmark: boolean = false; 
  timeout = null;
  enteredDish: string; 

  constructor(public platform: Platform, public dishesProvider: DishesProvider, public screenOrientation: ScreenOrientation, public viewCtrl: ViewController) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

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
    this.timeout = setTimeout(() => { 
      this.dishesProvider.getAllDishes().then(dishes => {
        if(dishes === null) {
          this.showNoDishesWarning = true;
        } else {
          this.dishes = dishes; 
        }
      }) 
    }, 1000)
  }

  addDish(dish) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.showInput = false;
      this.showDish = true; 
    }, 500);

    let index = this.dishes.indexOf(dish);
    let updatedDish = { name: this.enteredDish, active: true };
    console.log("Index of dish: " + index + " New dishObject " + JSON.stringify(updatedDish));
    
    if(index >= -1) {
      this.dishesProvider.addDish(updatedDish, index).then((data) => {
        console.log("UPDATED LIST " + JSON.stringify(data)); 
      })
    } else {
      console.log("JA DIT GAAT HELEMAAL FOUT"); 
    }
   
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
    }, 400); 
  }

  openInputField(dishObject) {
    let index = this.dishes.indexOf(dishObject);
    console.log("Deze input is nu open (index): " + index); 
    // de input moet alleen open bij de juiste index
    
      this.showInput = true; 
      this.showDish = false; 
    
    console.log("Welke dish? " + JSON.stringify(dishObject));
  }


  closeMenuModal() {
    console.log("The modal is closed!"); 
    this.viewCtrl.dismiss();
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
 

} 
