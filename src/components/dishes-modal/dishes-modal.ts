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
    this.dishes = ["Sop", "Nasi Goreng", "Pancakes", "Stamppot Andijvie", "...", "..."]; 
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
      this.dishes[index] = this.enteredDish; 
    }
  }


  checkInput(input) {
    console.log("De tekst: " + input.value);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(input.value >= 1) {
        this.showCheckmark = true;
      } else {
        this.showCheckmark = false; 
      }
    }, 500);
  }

  deleteDish(dish){
    let index = this.dishes.indexOf(dish);

    if(index > -1){
        this.dishes.splice(index, 1);
    }
  }

  openInputField(dishIndex) {

    let index = this.dishes.indexOf(dishIndex);
    console.log("Deze input is nu open: " + index); 
    this.showInput = true; 
    this.showDish = false; 
    console.log("Clicked on dish: " + JSON.stringify(dishIndex));
  }

  closeMenuModal() {
    console.log("The modal is closed!"); 
    this.viewCtrl.dismiss();
  }
 

} 
