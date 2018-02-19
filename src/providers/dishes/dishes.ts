import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Dish } from '../../models/dish.interface';

const STORAGE_KEY = 'allDishes';

@Injectable()
export class DishesProvider {

  dishesList: any[];
  constructor(public storage: Storage) { }

  initializeDishList(dishArray) {
    
    this.dishesList = [];
    dishArray.forEach(dish => {
      this.dishesList.push(dish);
    });
    
    return this.storage.set(STORAGE_KEY, this.dishesList);
  }

  addDish(dishObject, index) {
    return this.getAllDishes().then(result => {
      result[index] = dishObject;  
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  getAllDishes() {
    return this.storage.get(STORAGE_KEY);
  }
}
