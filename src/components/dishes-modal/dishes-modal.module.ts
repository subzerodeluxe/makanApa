import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesModalComponent } from './dishes-modal';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@NgModule({
  declarations: [DishesModalComponent],
  imports: [
    IonicPageModule.forChild(DishesModalComponent)
  ],
  providers: [AlertsProvider, NativePageTransitions],
  exports: [DishesModalComponent]
})
export class DishesModalComponentModule { }