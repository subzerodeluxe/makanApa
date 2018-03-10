import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActionPage } from './action';
import { ComponentsModule } from '../../components/components.module';
import { DishesProvider } from '../../providers/dishes/dishes';

@NgModule({
  declarations: [
    ActionPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ActionPage),
  ],
  exports: [
    ActionPage
  ],
  providers: [
    DishesProvider
  ]
})
export class ActionPageModule {}
