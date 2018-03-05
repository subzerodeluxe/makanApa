import { NgModule } from '@angular/core';
import { WheelComponent } from './wheel/wheel';
import { IonicModule } from 'ionic-angular';
import { DishesFormComponent } from './dishes-form/dishes-form';
@NgModule({
	declarations: [WheelComponent,
    DishesFormComponent],
	imports: [IonicModule],
	exports: [WheelComponent,
    DishesFormComponent]
})
export class ComponentsModule {}
