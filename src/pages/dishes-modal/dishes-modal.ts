import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
  name: 'dishesModal'
})
@Component({
  selector: 'dishes-modal',
  templateUrl: 'dishes-modal.html'
})
export class DishesModalComponent {

  form: FormGroup; 
  highLighted: number; 
  preDishList: Dish[]; 
  dishes: Dish[];
  showNoDishesWarning: boolean = false; 
  showCheckmark: boolean = false; 
  timeout = null;
  showInput: boolean = false;
  showDish: boolean = true;
  showForm: boolean; 

  constructor(public platform: Platform, public dishesProvider: DishesProvider, public screenOrientation: ScreenOrientation, 
    public viewCtrl: ViewController, private formBuilder: FormBuilder, public navCtrl: NavController) {
    if(this.platform.is('cordova')) {
      // set to portrait mode
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
    this.showForm = true; 
    this.buildForm(); 
  }

  buildForm() {
    this.form = this.formBuilder.group({
      dishName: ['', [Validators.required, Validators.minLength(2)]]
    });
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
      this.dishes = []; 
      console.log(JSON.stringify(error)); 
    });
  }

  ionViewDidLoad() {
    this.showAllDishes();
    setTimeout(() => {
      this.checkIfBlocksAreActive(this.dishes);  
    }, 1000);
  }

  addDish(formData: FormGroup, dish: Dish) {
    if(formData.valid == true) {
      let index = this.dishes.indexOf(dish); 
      let updatedDish: Dish = { name: this.form.value.dishName, active: true }; 
      if(index >= -1) {
        this.dishesProvider.addDish(updatedDish, index).then((data) => {
          console.log("UPDATED LIST " + JSON.stringify(data)); 
          this.highLighted = null;
          this.showAllDishes();
          this.buildForm(); 
          let outcome = this.checkIfBlocksAreActive(data);
          if(outcome === true) { this.showForm = false }; 
          console.log("YEEHAAA");
        })
      } else {
        console.log("JA DIT GAAT HELEMAAL FOUT"); 
        this.showNoDishesWarning = true;
      }
    }
  }

  checkInput(form, dish) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(form.valid === true) {
        this.showCheckmark = true;
        dish.active = true;
      } else {
        this.showCheckmark = false; 
        dish.active = false; 
      }
    }, 200); 
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

  openInputField(index) {
    this.highLighted = index;
  }

} 
