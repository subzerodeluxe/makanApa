import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'dishes-form',
  templateUrl: 'dishes-form.html'
})
export class DishesFormComponent {

  dishForm: FormGroup;
  dishes: Dish[];
  highLighted: boolean;
  timeout = null;
  showCheckmark: boolean = false; 
  public initialDishList: Dish[] = [
    { name: "Sop", active: true }, 
    { name: "Stamppot Andijvie", active: true },
    { name: "Nasi Goreng", active: true },
    { name: "...", active: false },
    { name: "...", active: false }];

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public dishesProvider: DishesProvider) {
    this.buildForm();

    this.dishesProvider.initializeDishList(this.initialDishList)
      .then(data => {
        console.log(data)
        this.dishes = data; 
      })
      .catch(error => console.log(error)); 
  }

  buildForm() {
    this.dishForm = this.formBuilder.group({
      dishName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  openInputField(index) {
    this.highLighted = index;
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

  addDish(formData: FormGroup, dish: Dish) {
    if(formData.valid == true) {
      let index = this.dishes.indexOf(dish); 
      let updatedDish: Dish = { name: this.dishForm.value.dishName, active: true }; 
      if(index >= -1) {
        this.dishesProvider.addDish(updatedDish, index)
          .then((data) => {
            this.highLighted = null;
            this.buildForm(); 
            this.showAllDishes();
            const outcome = this.dishesProvider.checkIfBlocksAreActive(data);
            if(outcome === true) { console.log("ALL IS RED!") }; 
            console.log("Added dish: " + updatedDish.name);
          })
          .catch(error => {
            console.log("Error: " + JSON.stringify(error));
          })
      } else {
        console.log("JA DIT GAAT HELEMAAL FOUT"); 
      }
    }
  }

  showAllDishes() {
    this.dishesProvider.getAllDishes().then(dishes => {
      if(dishes === null) {
        console.log("Ja, en toen waren er ineens geen dishes"); 
       
      } else {
        this.dishes = dishes; 
      }
    }).catch(error => {
   
      console.log("Something went wrong: " + error); 
    }) 
  }

  resetForm() {
    this.dishesProvider.initializeDishList(this.initialDishList)
      .then(data => { 
        this.dishes = data; 
        console.log("Dishes after deletion: " + JSON.stringify(this.dishes));
      })
      .catch(error => console.log(error));
      this.buildForm();
  }
}