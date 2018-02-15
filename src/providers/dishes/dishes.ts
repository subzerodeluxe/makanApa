import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'allDishes';

@Injectable()
export class DishesProvider {

  constructor(public storage: Storage) {
  
  }

  addDish(dishObject) {
    console.log("INCOMING PROVIDER DISHOBJECT " + JSON.stringify(dishObject));
    return this.getAllDishes().then(result => {
      console.log("PROVIDER RESULT: " + result);
      if (result) {
        console.log("KOMT IE HIER?");
        result.push(dishObject);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [dishObject]);
      }
    });
  }

  
  getAllDishes() {
    return this.storage.get(STORAGE_KEY);
  }
}
