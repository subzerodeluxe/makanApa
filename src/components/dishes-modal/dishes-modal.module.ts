import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesModalComponent } from './dishes-modal';

@NgModule({
  declarations: [DishesModalComponent],
  imports: [
    IonicPageModule.forChild(DishesModalComponent)
  ],
  providers: [],
  exports: [DishesModalComponent]
})
export class DishesModalComponentModule { }