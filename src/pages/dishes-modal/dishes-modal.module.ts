import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DishesModalComponent } from './dishes-modal';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { DishesProvider } from '../../providers/dishes/dishes';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [DishesModalComponent],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DishesModalComponent)
  ],
  providers: [AlertsProvider, DishesProvider],
  exports: [DishesModalComponent]
})
export class DishesModalComponentModule { }