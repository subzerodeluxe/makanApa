import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Dish } from '../../models/dish.interface';

const STORAGE_KEY = 'allDishes';

@Injectable()
export class DishesProvider {

  constructor(public storage: Storage) { }

  initializeDishList(dishesArray: Dish[]): Promise<Dish[]> {
    console.log("Dishes provider: dishes succesfully set"); 
    return this.storage.set(STORAGE_KEY, dishesArray);
  }

  addDish(dishObject: Dish, index: number): Promise<Dish[]> {
    return this.getAllDishes().then(result => {
      result[index] = dishObject;  
      return this.storage.set(STORAGE_KEY, result);
    })
  }

  getAllDishes(): Promise<Dish[]> {
    return this.storage.get(STORAGE_KEY); 
  }

  checkIfBlocksAreActive(dishesArray: Dish[]): boolean {
    let allActive; let notActive; 
    notActive = dishesArray.filter(dish => dish.active === false);
    if(notActive.length >= 1) {
      return allActive = false; 
    } else {
      return allActive = true;
    }
  }


}