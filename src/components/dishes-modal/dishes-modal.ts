import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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
    public viewCtrl: ViewController, private nativePageTransitions: NativePageTransitions, public navCtrl: NavController) {
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
    }).catch(error => {
      console.log(JSON.stringify(error)); 
    });
  }

  ionViewDidLoad() {
    this.showAllDishes();
    setTimeout(() => {
      console.log(this.checkIfBlocksAreActive(this.dishes)); 
    }, 1000); 
    
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
        let outcome = this.checkIfBlocksAreActive(data);
        if(outcome === true) { this.navCtrl.setRoot('home'); }; 
      })
    } else {
      console.log("JA DIT GAAT HELEMAAL FOUT"); 
      this.showNoDishesWarning = true;
    }
  }

  checkIfBlocksAreActive(dishesArray): boolean {
    let allActive; let notActive; 
    notActive = dishesArray.filter(dish => dish.active === false);
    if(notActive.length >= 1) {
      return allActive = false; 
    } else {
      return allActive = true;
    }
  }

   

  showAllDishes() {
    this.dishesProvider.getAllDishes().then(dishes => {
      if(dishes === null) {
        console.log("Ja, en toen waren er ineens geen dishes"); 
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
    if (this.navCtrl.canGoBack()) {
      let options: NativeTransitionOptions = {
        direction: 'down',
        duration: 500,
        slowdownfactor: -1,
        slidePixels: 20,
      };
  
      this.nativePageTransitions.slide(options);
      this.navCtrl.pop();
    } else {
      let options: NativeTransitionOptions = {
        duration: 700
      };
      this.nativePageTransitions.fade(options);
      this.viewCtrl.dismiss();
    }
  }


} 
