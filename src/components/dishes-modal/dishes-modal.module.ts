import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesModalComponent } from './dishes-modal';
import { AlertsProvider } from '../../providers/alerts/alerts';

@NgModule({
  declarations: [DishesModalComponent],
  imports: [
    IonicPageModule.forChild(DishesModalComponent)
  ],
  providers: [AlertsProvider],
  exports: [DishesModalComponent]
})
export class DishesModalComponentModule { }