import { Component } from '@angular/core';
import { DishesProvider } from '../../providers/dishes/dishes';
import { Dish } from '../../models/dish.interface';

@Component({
  selector: 'wheel',
  templateUrl: 'wheel.html',
})

export class WheelComponent {
  
  dish: Dish;
  selectedDish: string; 

  constructor(public dishesProvider: DishesProvider) {
    console.log('Time to spin the wheel!');
    this.pickRandomDish(); 
  }

  pickRandomDish() {
    this.dishesProvider.getAllDishes()
      .then(dishes => {
        console.log(dishes);
        this.dish = dishes[Math.floor(Math.random()*dishes.length)]; 
        this.selectedDish = this.dish.name; 
      })
  }

}
