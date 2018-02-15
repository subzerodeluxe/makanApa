import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage({
  name: 'dishesModal'
})
@Component({
  selector: 'dishes-modal',
  templateUrl: 'dishes-modal.html'
})
export class DishesModalComponent {

  dishes: any;
  showInput: boolean = false;
  showDish: boolean = true;
  showCheckmark: boolean = false; 
  timeout = null;
  enteredDish: string; 

  constructor(public platform: Platform, public screenOrientation: ScreenOrientation, public viewCtrl: ViewController) {
    if(this.platform.is('cordova')) {
      // set to landscape
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
   } 
  }

  ionViewDidLoad() {
    this.dishes = [
      { name: "Sop", active: true }, 
      { name: "Stamppot Andijvie", active: true },
      { name: "Nasi Goreng", active: true },
      { name: "...", active: false },
      { name: "...", active: false }]; 
  }

  addDish(dish) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.showInput = false;
      this.showDish = true; 
    }, 500);

    console.log("New dish: " + this.enteredDish)
    let index = this.dishes.indexOf(dish); 
    console.log("Index of dish: " + index);
    
    if(index > -1) {
      this.dishes[index] = { name: this.enteredDish, active: true }; 
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

  deleteDish(dish){
    let index = this.dishes.indexOf(dish);

    if(index > -1){
        this.dishes.splice(index, 1);
    }
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
 

} 
