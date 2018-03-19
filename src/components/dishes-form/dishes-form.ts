import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../models/dish.interface';
import { DishesProvider } from '../../providers/dishes/dishes';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'dishes-form',
  templateUrl: 'dishes-form.html'
})
export class DishesFormComponent {

  @Output() allActiveEvent = new EventEmitter<any>(); 

  error: any; 
  dishForm: FormGroup;
  dishes: Dish[];
  highLighted: boolean;
  timeout = null;
  showCheckmark: boolean = false; 
  errMessage: string = "Trouble getting your dishes. Please press the back button on your phone and try again!";
  
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public dishesProvider: DishesProvider) { 
    this.initializeDishesForm();
  }

  initializeDishesForm() {
    this.dishesProvider.getAllDishes()
      .then(data => {
        if(data != null) {
          this.buildForm();
          this.dishes = data
        } else {
          console.log("Error initializing dishes"); 
          this.error = this.errMessage;
        }
      })
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
            this.initializeDishesForm(); 
            
            const outcome = this.dishesProvider.checkIfBlocksAreActive(data);
            this.allActiveEvent.emit(outcome)
          })
          .catch(error => {
            console.log("Error: " + JSON.stringify(error));
          })
      } else {
        console.log("JA DIT GAAT HELEMAAL FOUT"); 
      }
    }
  }
}